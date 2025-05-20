import { NextResponse, NextRequest } from "next/server";
import {
  deleteBoard,
  getBoardById,
  updateBoard,
} from "@/lib/services/boardService";
import { boardSchema } from "@/types/schemas/boardSchema";
import { Board } from "@/types/board";

const partialBoardUpdateSchema = boardSchema
  .omit({ id: true })
  .partial()
  .refine((data) => data.title !== "", {
    message: "Title cannot be empty if provided",
    path: ["title"],
  });

export async function GET({ params }: { params: { id: string } }) {
  const id = params.id;
  const boardId = Number(id);
  if (!id || isNaN(boardId)) {
    return NextResponse.json({ message: "Invalid board ID" }, { status: 400 });
  }
  const board: Board = await getBoardById(boardId);
  if (!board) {
    return NextResponse.json({ message: "Board not found" }, { status: 404 });
  }
  return NextResponse.json(board.id, { status: 200 });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const boardId = Number(id);

  if (!id || isNaN(boardId)) {
    return NextResponse.json({ message: "Invalid board ID" }, { status: 400 });
  }
  const body = await request.json();
  const result = partialBoardUpdateSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { error: "Invalid request", issues: result.error.format() },
      { status: 400 }
    );
  }
  const existingBoard = await getBoardById(boardId);
  if (!existingBoard) {
    return NextResponse.json({ error: "Board not found" }, { status: 404 });
  }
  const updateData = result.data;
  const board = await updateBoard(boardId, updateData);
  return NextResponse.json(board.id, { status: 200 });
}

export async function DELETE({ params }: { params: { id: string } }) {
  const id = params.id;
  const boardId = Number(id);

  if (!id || isNaN(boardId)) {
    return NextResponse.json({ error: "Invalid board ID" }, { status: 400 });
  }

  const existingBoard = await getBoardById(boardId);

  if (!existingBoard) {
    return NextResponse.json({ error: "Board not found" }, { status: 404 });
  }

  await deleteBoard(boardId);

  return NextResponse.json(
    { message: "Board deleted successfully" },
    { status: 200 }
  );
}
