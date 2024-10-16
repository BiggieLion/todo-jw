import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { ITask, ITaskDTO, ITaskResponse } from '@shared/models';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly url = environment.baseUrl;

  constructor(private readonly httpClient: HttpClient) {}

  createTask(task: ITask): void {
    this.getId()
      .pipe(
        tap((id) => {
          console.log(task);
          let taskToCreate: ITaskDTO = {
            Id: id,
            Title: task.Titulo,
            IsDone: task.Estatus === 'Pendiente' ? true : false,
            DueDate: new Date(task.Vencimiento),
            Notes: task.Notas,
          };

          console.log('->', taskToCreate);

          this.httpClient.post(`${this.url}tasks`, taskToCreate).subscribe();
        })
      )
      .subscribe();
  }

  getTasks(): Observable<ITask[]> {
    return this.httpClient.get(`${this.url}tasks`).pipe(
      map((res: any) => {
        let resArray: ITask[] = [];
        res?.data.forEach((item: ITaskResponse) => {
          resArray.push({
            ID: item?.id,
            Titulo: item.title,
            Notas: item.notes,
            Estatus: item.isDone ? 'Completado' : 'Pendiente',
            Vencimiento: new Date(item.dueDate).toString(),
          });
        });

        console.log('resArray', resArray);
        return resArray;
      })
    );
  }

  updateTask(taskId: number, task: any) {
    console.log('<----- task from update>', taskId, task);
  }

  deleteTask(taskId: number) {
    return this.httpClient.delete(`${this.url}tasks/${taskId}`).pipe(
      map((res: any) => {
        console.log('res', res);
      })
    );
  }

  private getId() {
    return this.httpClient.get(`${this.url}tasks`).pipe(
      map((res: any) => {
        if (res?.data === undefined || res?.data.length === 0) {
          return 1;
        } else if (res?.data?.length === 1) {
          return res?.data[0]?.id + 1;
        } else {
          const idArrays: any = res?.data?.sort((a: any, b: any) => parseInt(b?.id) - parseInt(a?.id));
          return idArrays[0]?.id + 1;
        }
      })
    );
  }
}
