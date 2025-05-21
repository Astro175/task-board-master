import { useMutation, useQueryClient } from "@tanstack/react-query";
import { boardService } from "@/lib/services/frontend/boardService";
import { Board } from "@/types/board";

export default function useCreateBoard() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Omit<Board, "id">) => boardService.create(data),

    onMutate: async (newBoardData) => {
      await queryClient.cancelQueries({ queryKey: ["boards"] });

      const previousBoards = queryClient.getQueryData<Board[]>(["boards"]);

      const tempId = Date.now(); // Temporary optimistic ID
      const optimisticBoard: Board = { id: tempId, ...newBoardData };

      // Optimistically update the boards list
      queryClient.setQueryData<Board[]>(["boards"], (old) => [
        ...(old || []),
        optimisticBoard,
      ]);

      // Optimistically set the single board query too
      queryClient.setQueryData<Board>(["board", tempId], optimisticBoard);

      // Return rollback context
      return {
        previousBoards,
        tempId,
      };
    },

    onError: (err, newBoardData, context) => {
      if (context?.previousBoards) {
        queryClient.setQueryData(["boards"], context.previousBoards);
      }
      if (context?.tempId) {
        queryClient.removeQueries({ queryKey: ["board", context.tempId] });
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
    },
  });
}
