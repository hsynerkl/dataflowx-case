import { useMutation, useQueryClient } from "@tanstack/react-query";

const API_URL = "https://jsonplaceholder.typicode.com/users";

export const useDeleteData = () => {
  const queryClient = useQueryClient();

  return useMutation<number, Error, number>({
    mutationKey: ["deleteUser"],
    mutationFn: async (id: number) => {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Ağ hatası");
      }
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["data"] });
    },
  });
};
