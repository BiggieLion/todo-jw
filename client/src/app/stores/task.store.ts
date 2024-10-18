import { inject } from '@angular/core';
import { ITask } from '@features/tasks/tasks.interfaces';
import { TaskService } from '@features/tasks/tasks.service';
import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { pipe, switchMap, tap } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';

type TaskState = {
  tasks: ITask[];
  isLoading: boolean;
};

const initialState: TaskState = {
  tasks: [],
  isLoading: false,
};

export const TaskStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, _taskSvc = inject(TaskService)) => ({
    addTask: rxMethod<ITask>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((newTask: ITask) => {
          if (store.tasks().length === 0) {
            newTask.id = 1;
          } else {
            const lastTask = store.tasks()[store.tasks().length - 1];
            newTask.id = lastTask?.id + 1;
          }
          return _taskSvc.create(newTask).pipe(
            tapResponse({
              next: (task: ITask) => {
                const tasks = [...store.tasks(), task];
                patchState(store, { tasks, isLoading: false });
              },
              error: (err) => console.error('Error creating task', err),
            })
          );
        })
      )
    ),

    getTasks: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap(() =>
          _taskSvc.getTasks().pipe(
            tapResponse({
              next: (tasks: ITask[]) => {
                patchState(store, { tasks, isLoading: false });
              },
              error: (err) => console.error('Error getting tasks', err),
            })
          )
        )
      )
    ),

    updateTask: rxMethod<ITask>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((taskUpdated: ITask) =>
          _taskSvc.update(taskUpdated).pipe(
            tapResponse({
              next: (task: ITask) => {
                const tasks = store
                  .tasks()
                  .map((item) => (item.id === task.id ? task : item));
                patchState(store, {
                  tasks,
                  isLoading: false,
                });
              },
              error: (err) => console.error('Error updating task', err),
            })
          )
        )
      )
    ),

    deleteTask: rxMethod<ITask>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((toRemove: ITask) =>
          _taskSvc.delete(toRemove).pipe(
            tapResponse({
              next: (removed: ITask) => {
                const tasks = store
                  .tasks()
                  .filter((item) => item.id !== removed.id);
                patchState(store, {
                  tasks,
                  isLoading: false,
                });
              },
              error: (err) => console.error('Error updating task', err),
            })
          )
        )
      )
    ),
  })),
  withHooks({
    onInit(store) {
      store.getTasks();
    },
    onDestroy(store) {
      console.log('destroying task store', store);
    },
  })
);
