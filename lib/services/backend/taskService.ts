import prisma from "../../prismaClient";
import { Task } from "@/types/task";

export const getTaskById = async (id: number) => {
  try {
    const task: Task = await prisma.task.get({
      where: { id },
    });
    if (!task) {
      throw new Error("Task not found");
    }
    return task;
  } catch (error) {
    console.error("Error fetching task:", error);
    throw new Error("Could fetch given task");
  }
};

export const createTask = async (data: Omit<Task, "id">) => {
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

export const updateTask = async (id: number, data: Partial<Task>) => {
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
