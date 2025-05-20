enum Status {
  IN_PROGRESS,
  WONT_DO,
  COMPLETED,
}
export type Task = {
  id: number;
  title: string;
  description: string;
  icon: string;
  status: Status;
  boardId: number;
};
