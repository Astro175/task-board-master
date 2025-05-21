import { useMutation, useQueryClient } from "@tanstack/react-query";
import { taskService } from "@/lib/services/frontend/taskService";
import { Task } from "@/types/task";

export default function useUpdateTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      taskId,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      boardId,
      data,
    }: {
      taskId: number;
      boardId: number;
      data: Partial<Task>;
    }) => taskService.update(taskId, data),
    onSuccess: (_, { boardId }) =>
      queryClient.invalidateQueries({ queryKey: ["boards", boardId] }),
  });
}
