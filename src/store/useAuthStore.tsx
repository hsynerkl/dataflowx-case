import getCookieAsJson from "@/utils/getCookieAsJson";
import { create } from "zustand";
import { NavigateFn } from "@tanstack/react-router";

export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
  refreshToken: string;
}

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  setUser: (user: User | null) => void;
  startLogoutTimer: (navigate: NavigateFn) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isLoggedIn: false,

  setUser: (user: User | null) => {
    if (user) {
      const expiresAt = new Date().getTime() + 30 * 60 * 1000;
      set({ user, isLoggedIn: true });
      document.cookie = `auth=${encodeURIComponent(
        JSON.stringify({ ...user, expiresAt, isLoggedIn: true })
      )}; path=/; max-age=${30 * 60}`;
    } else {
      set({ user: null, isLoggedIn: false });
      document.cookie = "auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    }
  },

  logout: () => {
    set({ user: null, isLoggedIn: false });
    document.cookie = "auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  },

  startLogoutTimer: (navigate) => {
    const authData = getCookieAsJson("auth");
    if (!authData) {
      get().logout();
      navigate({ to: "/login" });
      return;
    }

    if (authData && authData.expiresAt) {
      const expiresAt = new Date(authData.expiresAt).getTime();
      const now = new Date().getTime();
      const remainingTime = expiresAt - now;

      if (remainingTime > 0) {
        setTimeout(() => {
          get().logout();
          navigate({ to: "/login" });
        }, remainingTime);
      } else {
        get().logout();
        navigate({ to: "/login" });
      }
    }
  },
}));
