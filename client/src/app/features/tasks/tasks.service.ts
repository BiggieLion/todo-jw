import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environment';
import { ITask } from '@features/tasks/tasks.interfaces';
import { catchError, map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly url = environment.baseUrl;
  private readonly _httpClient = inject(HttpClient);

  create(task: ITask): Observable<ITask> {
    return this._httpClient.post<ITask>(`${this.url}tasks`, task).pipe(
      map((res: any) => {
        return res?.data;
      })
    );
  }

  // createTask(task: TaskFront): void {
  //   this.getId()
  //     .pipe(
  //       tap((id) => {
  //         let taskToCreate: ITaskDTO = {
  //           Id: id,
  //           Title: task.Titulo,
  //           IsDone: task.Estatus === 'Pendiente' ? true : false,
  //           DueDate: new Date(task.Vencimiento),
  //           Notes: task.Notas,
  //         };

  //         this._httpClient.post(`${this.url}tasks`, taskToCreate).subscribe(
  //           (res) => {
  //           },
  //           (error) => {
  //             console.error('Error creating task', error);
  //           }
  //         );
  //       })
  //     )
  //     .subscribe();
  // }

  // getTasks(): Observable<TaskFront[]> {
  //   return this._httpClient.get(`${this.url}tasks`).pipe(
  //     map((res: any) => {
  //       let resArray: TaskFront[] = [];
  //       res?.data.forEach((item: ITaskResponse) => {
  //         resArray.push({
  //           ID: item?.id,
  //           Titulo: item.title,
  //           Notas: item.notes,
  //           Estatus: item.isDone ? 'Completado' : 'Pendiente',
  //           Vencimiento: new Date(item.dueDate).toString(),
  //         });
  //       });

  //       return resArray;
  //     })
  //   );
  // }
  getTasks(): Observable<ITask[]> {
    return this._httpClient.get<ITask[]>(`${this.url}tasks`).pipe(
      map((res: any) => {
        return res?.data;
      })
    );
  }

  // updateTask(taskId: number, task: any) {
  //   const taskToUpdate: ITaskDTO = {
  //     Id: taskId,
  //     Title: task.Titulo,
  //     IsDone: task.Estatus === 'Completado' ? true : false,
  //     DueDate: new Date(task.Vencimiento).toString(),
  //     Notes: task.Notas,
  //   };

  //   return this._httpClient.patch(`${this.url}tasks/${taskId}`, taskToUpdate);
  // }
  update(task: Partial<ITask>): Observable<ITask> {
    return this._httpClient
      .patch<ITask>(`${this.url}tasks/${task.id}`, task)
      .pipe(
        map((res: any) => {
          return res?.data;
        })
      );
  }

  // deleteTask(taskId: number) {
  //   return this._httpClient
  //     .delete(`${this.url}tasks/${taskId}`)
  //     .pipe(map((res: any) => {}));
  // }
  delete(task: ITask): Observable<ITask> {
    return this._httpClient.delete<ITask>(`${this.url}tasks/${task.id}`).pipe(
      map((res: any) => {
        return res?.data;
      })
    );
  }

  getId(): Observable<number> {
    return this._httpClient.get(`${this.url}tasks`).pipe(
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

  // private getId() {
  //   return this._httpClient.get(`${this.url}tasks`).pipe(
  //     map((res: any) => {
  //       if (res?.data === undefined || res?.data.length === 0) {
  //         return 1;
  //       } else if (res?.data?.length === 1) {
  //         return res?.data[0]?.id + 1;
  //       } else {
  //         const idArrays: any = res?.data?.sort(
  //           (a: any, b: any) => parseInt(b?.id) - parseInt(a?.id)
  //         );
  //         return idArrays[0]?.id + 1;
  //       }
  //     })
  //   );
  // }
}
