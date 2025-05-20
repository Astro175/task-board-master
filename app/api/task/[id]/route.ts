import { NextResponse, NextRequest } from "next/server";
import { taskSchema } from "@/types/schemas/taskSchema";
import {
  deleteTask,
  getTaskById,
  updateTask,
} from "@/lib/services/taskService";

export const taskPatchSchema = taskSchema
  .omit({ id: true, boardId: true })
  .partial();

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const taskId = Number(id);

  if (!id || isNaN(taskId))
    return NextResponse.json({ error: "Invalid task ID" }, { status: 400 });

  const body = request.json();
  const result = taskPatchSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { error: "Invalid request", issues: result.error.format() },
      { status: 400 }
    );
  }
  const existingTask = await getTaskById(taskId);

  if (!existingTask) {
    return NextResponse.json({ error: "Task not found" }, { status: 404 });
  }
  const updateData = result.data;
  const task = await updateTask(taskId, updateData);
  return NextResponse.json(task.id, { status: 200 });
}

export async function DELETE({ params }: { params: { id: string } }) {
  const id = params.id;
  const taskId = Number(id);

  if (!id || isNaN(taskId))
    return NextResponse.json({ error: "Invalid task ID" }, { status: 400 });

  const existingTask = await getTaskById(taskId);

  if (!existingTask) {
    return NextResponse.json({ error: "Task not found" }, { status: 404 });
  }

  await deleteTask(taskId);

  return NextResponse.json(
    { message: "Task deleted successfully" },
    { status: 200 }
  );
}
