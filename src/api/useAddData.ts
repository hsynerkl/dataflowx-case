import { useMutation, useQueryClient } from "@tanstack/react-query";

interface User {
  id: number;
  name: string;
  email: string;
}

const API_URL = "https://jsonplaceholder.typicode.com/users";

export const useAddData = () => {
  const queryClient = useQueryClient();

  return useMutation<User, Error, Omit<User, "id">>({
    mutationKey: ["addUser"],
    mutationFn: async (newUser) => {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return (await response.json()) as User;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
