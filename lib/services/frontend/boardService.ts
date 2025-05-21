import { Board } from "@/types/board";
import axios from "axios";

export const boardService = {
  async create(data: Omit<Board, "id">): Promise<Board> {
    try {
      const res = await axios.post(`api/board`, data);
      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data || error.message || "Failed to create board";
        throw new Error(message);
      }
      throw new Error("Unexpected error");
    }
  },
  async getById(id: number): Promise<Board> {
    try {
      const res = await axios.get(`api/board/${id}`);
      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data || error.message || "Failed to fetch board";
        throw new Error(message);
      }
      throw new Error("Unexpected error");
    }
  },
  async update(id: number, data: Partial<Board>): Promise<Board> {
    try {
      const res = await axios.patch(`api/boards/${id}`, data);
      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data || error.message || "Failed to update board";
        throw new Error(message);
      }
      throw new Error("Unexpected error");
    }
  },
  async delete(id: number): Promise<void> {
    try {
      await axios.delete(`api/boards/${id}`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data || error.message || "Failed to delete board";
        throw new Error(message);
      }
      throw new Error("Unexpected error");
    }
  },
};
