import { z } from "zod";


export enum Status {
  IN_PROGRESS,
  PENDING,
  COMPLETED,
}


export const taskSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  icon: z.string(),
  status: z.nativeEnum(Status),
  boardId: z.number(),
});

export type Task = z.infer<typeof taskSchema>;
