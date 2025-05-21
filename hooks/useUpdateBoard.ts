import { useMutation, useQueryClient } from "@tanstack/react-query";
import { boardService } from "@/lib/services/frontend/boardService";
import { Board } from "@/types/board";

export default function useUpdateBoard() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Board> }) =>
      boardService.update(id, data),

    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: ["board", id] });

      const previousBoard = queryClient.getQueryData<Board>(["board", id]);

      queryClient.setQueryData<Board>(["board", id], (old) => ({
        ...old!,
        ...data,
      }));

      return { previousBoard };
    },

    onError: (_err, { id }, context) => {
      if (context?.previousBoard) {
        queryClient.setQueryData(["board", id], context.previousBoard);
      }
    },

    onSettled: (_data, _error, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["board", id] });
      queryClient.invalidateQueries({ queryKey: ["boards"] });
    },
  });
}
