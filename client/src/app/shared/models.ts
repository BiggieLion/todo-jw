export type ColumnKeys<T> = Array<keyof T>;

export interface ITask {
  ID: number | undefined;
  Titulo: string;
  Notas: string;
  Estatus: string;
  Vencimiento: string;
  Acciones?: string;
}

export interface ITaskDTO {
  Id?: number;
  Title: string;
  IsDone: boolean;
  DueDate: string | Date;
  Notes: string;
}

export interface ITaskResponse {
  id?: number;
  title: string;
  isDone: boolean;
  dueDate: string;
  notes: string;
}
