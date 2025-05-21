import { Task } from "@/types/task";
import axios from "axios";

export const taskService = {
  async create(data: Task): Promise<Task> {
    try {
      const response = await axios.post(`/api/task/`, data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.error ||
          error.message ||
          "Failed to create task";
        throw new Error(message);
      }
      throw new Error("Failed to create task");
    }
  },

  async update(id: number, data: Partial<Task>): Promise<Task> {
    try {
      const response = await axios.patch(`/api/task/${id}`, data);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.error ||
          error.message ||
          "Failed to create task";
        throw new Error(message);
      }
      throw new Error("Failed to create task");
    }
  },

  async delete(id: number): Promise<void> {
    try {
      const response = await axios.delete(`/api/task/${id}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.error ||
          error.message ||
          "Failed to delete task";
        throw new Error(message);
      }
      throw new Error("Failed to delete task");
    }
  },
};
