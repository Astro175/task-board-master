import { Task } from "./task";
export type Board = {
    id: number;
    title: string;
    createdAt: Date;
    tasks: Task[];
}