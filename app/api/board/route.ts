import { boardSchema } from "@/types/schemas/boardSchema";
import { createBoard } from "@/lib/services/boardService";

import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const result = boardSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { error: "Invalid Request", issues: result.error?.format() },
      {
        status: 400,
      }
    );
  }
  const board = result.data;
  const data = await createBoard(board);
  return NextResponse.json(data.id, { status: 200 });
}


