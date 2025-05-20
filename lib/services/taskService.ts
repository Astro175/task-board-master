import prisma from "../prismaClient";
import { Task } from "@/types/task";

export const create = async (data: Omit<Task, "id">) => {
  try {
    const task: Task = await prisma.task.create({
      data,
    });
    return task;
  } catch (error) {
    console.error("Error creating new task:", error);
    throw new Error("Could not create new task");
  }
};

export const update = async (id: number, data: Partial<Task>) => {
  try {
    const task = await prisma.task.update({
      where: { id },
      data,
    });
    return task;
  } catch (error) {
    console.error("Error updating task", error);
    throw new Error("Could not update task");
  }
};

export const deleteTask = async (id: number) => {
  try {
    await prisma.task.delete({
      where: { id },
    });
  } catch (error) {
    console.error("Error deleting task:", error);
    throw new Error("Could not delete task");
  }
};
