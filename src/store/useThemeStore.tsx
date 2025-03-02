import { create } from "zustand";

interface ThemeStore {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export const useThemeStore = create<ThemeStore>((set) => ({
  isSidebarOpen: true,
  toggleSidebar: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
}));
