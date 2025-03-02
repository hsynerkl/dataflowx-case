import { useMutation, useQueryClient } from "@tanstack/react-query";

interface User {
  id: number;
  name: string;
  email: string;
}

const API_URL = "https://jsonplaceholder.typicode.com/users";

export const useEditData = () => {
  const queryClient = useQueryClient();

  return useMutation<User, Error, User>({
    mutationKey: ["editUser"],
    mutationFn: async (updatedUser: User) => {
      const response = await fetch(`${API_URL}/${updatedUser.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      });
      if (!response.ok) {
        throw new Error("Ağ hatası");
      }
      return (await response.json()) as User;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["data"] });
    },
  });
};
