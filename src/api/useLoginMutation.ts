import { useMutation } from "@tanstack/react-query";
import { useAuthStore, User } from "@/store/useAuthStore";

interface LoginData {
  username: string;
  password: string;
}

export function useLoginMutation() {
  const { setUser } = useAuthStore();

  return useMutation<User, Error, LoginData>({
    mutationFn: async (loginData: LoginData): Promise<User> => {
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: loginData.username,
          password: loginData.password,
          expiresInMins: 30,
        }),
        credentials: "same-origin",
      });

      const data = await response.json();

      if (!data.accessToken) {
        throw new Error("Login failed");
      }
      return data as User;
    },
    onSuccess: (data: User) => {
      setUser(data);
    },
    onError: (error: Error) => {
      console.error("Login Error:", error);
    },
  });
}
