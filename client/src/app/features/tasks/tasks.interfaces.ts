export type ColumnKeys<T> = Array<keyof T>;

export interface ITask {
  id: number;
  title: string;
  isDone: boolean;
  dueDate: string;
  notes: string;
  actions?: string;
}
