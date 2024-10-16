import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, signal } from '@angular/core';
import { GridComponent } from '../../../components/grid/grid.component';
import { ITask, ColumnKeys } from '@shared/models';
import { TaskService } from '@core/services/task.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [GridComponent],
  template: `
    <section>
      <app-grid [displayedColumns]="displayedColumns" [data]="tasks()" />
    </section>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent implements OnInit {
  constructor(
    private readonly taskSvc: TaskService,
    private readonly destroyRef: DestroyRef
  ) {}

  tasks = signal<ITask[]>([]);
  displayedColumns: ColumnKeys<ITask> = ['ID', 'Titulo', 'Notas', 'Estatus', 'Vencimiento', 'Acciones'];

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(): void {
    this.taskSvc
      .getTasks()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap((tasksR: ITask[]) => {
          console.log('tasksR', tasksR);
          this.tasks.set(tasksR);
          console.log('this.tasks', this.tasks);
        })
      )
      .subscribe();
  }
}
