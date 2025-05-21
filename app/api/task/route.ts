import { NextResponse, NextRequest } from "next/server";
import { taskSchema } from "@/types/schemas/taskSchema";
import { createTask } from "@/lib/services/backend/taskService";

export async function POST(request: NextRequest) {
  const body = request.json();

  const result = taskSchema.safeParse(body);
  if (!result.success)
    return NextResponse.json(
      { error: "Invalid Request", issue: result.error.format() },
      { status: 400 }
    );
  const task = result.data;
  const data = await createTask(task);
  return NextResponse.json(data, { status: 200 });
}
