import { useMutation, useQueryClient } from "@tanstack/react-query";
import { taskService } from "@/lib/services/frontend/taskService";

export default function useDeleteTask() {
  const queryCient = useQueryClient();
  return useMutation({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    mutationFn: ({ taskId, boardId }: { taskId: number; boardId: number }) =>
      taskService.delete(taskId),
    onSuccess: (_, { boardId }) =>
      queryCient.invalidateQueries({ queryKey: ["boards", boardId] }),
  });
}
