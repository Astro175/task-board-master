import { z } from "zod";
import { taskSchema } from "./taskSchema";

export const boardSchema = z.object({
  id: z.number(),
  title: z.string(),
  createdAt: z.coerce.date(),
  tasks: z.array(taskSchema),
});

export type Board = z.infer<typeof boardSchema>;
