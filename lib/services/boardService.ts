import prisma from "../prismaClient";
import { Board } from "@/types/board";

export const getBoardById = async (id: number) => {
  try {
    const board = await prisma.board.findUnique({
      where: {
        id: id,
      },
      include: {
        tasks: true,
      },
    });
    if (!board) {
      throw new Error("Board not found");
    }
    return board;
  } catch (error) {
    console.error("Error fetching board:", error);
    throw new Error("Could not fetch board");
  }
};

export const createBoard = async (data: Omit<Board, "id">) => {
  try {
    const board = await prisma.board.create({
      data,
    });
    return board;
  } catch (error) {
    console.error("Error creating new board:", error);
    throw new Error("Could not create board");
  }
};
export const updateBoard = async (id: number, data: Partial<Board>) => {
  try {
    const board = await prisma.board.update({
      where: {
        id,
      },
      data,
    });
    return board;
  } catch (error) {
    console.error("Error updating board:", error);
    throw new Error("Could not update board");
  }
};

export const deleteBoard = async (id: number) => {
  try {
    await prisma.board.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    console.log("Error deleting board:", error);
    throw new Error("Could not delete board");
  }
};
