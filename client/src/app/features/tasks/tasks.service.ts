import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import {
  TaskFront,
  ITaskDTO,
  ITaskResponse,
} from '@features/tasks/tasks.interfaces';
import { catchError, map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly url = environment.baseUrl;

  constructor(private readonly httpClient: HttpClient) {}

  createTask(task: TaskFront): void {
    this.getId()
      .pipe(
        tap((id) => {
          let taskToCreate: ITaskDTO = {
            Id: id,
            Title: task.Titulo,
            IsDone: task.Estatus === 'Pendiente' ? true : false,
            DueDate: new Date(task.Vencimiento),
            Notes: task.Notas,
          };

          this.httpClient.post(`${this.url}tasks`, taskToCreate).subscribe(
            (res) => {
              console.log('Task created', res);
            },
            (error) => {
              console.error('Error creating task', error);
            }
          );
        })
      )
      .subscribe();
  }

  getTasks(): Observable<TaskFront[]> {
    return this.httpClient.get(`${this.url}tasks`).pipe(
      map((res: any) => {
        let resArray: TaskFront[] = [];
        res?.data.forEach((item: ITaskResponse) => {
          resArray.push({
            ID: item?.id,
            Titulo: item.title,
            Notas: item.notes,
            Estatus: item.isDone ? 'Completado' : 'Pendiente',
            Vencimiento: new Date(item.dueDate).toString(),
          });
        });

        return resArray;
      })
    );
  }

  updateTask(taskId: number, task: any) {
    const taskToUpdate: ITaskDTO = {
      Id: taskId,
      Title: task.Titulo,
      IsDone: task.Estatus === 'Completado' ? true : false,
      DueDate: new Date(task.Vencimiento).toString(),
      Notes: task.Notas,
    };

    return this.httpClient.patch(`${this.url}tasks/${taskId}`, taskToUpdate);
  }

  deleteTask(taskId: number) {
    return this.httpClient
      .delete(`${this.url}tasks/${taskId}`)
      .pipe(map((res: any) => {}));
  }

  private getId() {
    return this.httpClient.get(`${this.url}tasks`).pipe(
      map((res: any) => {
        if (res?.data === undefined || res?.data.length === 0) {
          return 1;
        } else if (res?.data?.length === 1) {
          return res?.data[0]?.id + 1;
        } else {
          const idArrays: any = res?.data?.sort(
            (a: any, b: any) => parseInt(b?.id) - parseInt(a?.id)
          );
          return idArrays[0]?.id + 1;
        }
      })
    );
  }
}
