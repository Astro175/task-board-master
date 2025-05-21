import { useMutation, useQueryClient } from "@tanstack/react-query";
import { boardService } from "@/lib/services/frontend/boardService";

export default function useDeleteBoard() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => boardService.delete(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
      queryClient.removeQueries({ queryKey: ["board", id] });
    },
  });
}
