enum Status {
    IN_PROGRESS,
    PENDING,
    COMPLETED,
  }
export type Task= {
    id: number;
    title: string;
    description: string;
    icon: string;
    status: Status;
    boardId: number;
}