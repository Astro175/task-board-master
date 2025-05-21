import { useMutation, useQueryClient } from "@tanstack/react-query";
import { taskService } from "@/lib/services/frontend/taskService";
import { Task } from "@/types/task";

export default function useCreateTask() {
  const queryCient = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<Task, "id">) => taskService.create(data),
    onSuccess: () => queryCient.invalidateQueries({ queryKey: ["tasks"] }),
  });
}
