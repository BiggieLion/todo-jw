import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { GridComponent } from '@components/grid/grid.component';
import { ColumnKeys, TaskFront } from '../tasks.interfaces';
import { TaskService } from '../tasks.service';
import { tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [GridComponent],
  template: `
    <section>
      <app-grid
        [displayedColumns]="displayColumns"
        [data]="tasks()"
        [sortableColumns]="sortable"
      />
    </section>
  `,
  styles: ``,
})
export class ListComponent implements OnInit {
  private readonly _tasksSvc = inject(TaskService);
  private readonly _destroyRef = inject(DestroyRef);

  tasks = signal<TaskFront[]>([]);

  displayColumns: ColumnKeys<TaskFront> = [
    'ID',
    'Titulo',
    'Notas',
    'Estatus',
    'Vencimiento',
    'Acciones',
  ];
  sortable: ColumnKeys<TaskFront> = ['ID', 'Titulo', 'Estatus', 'Vencimiento'];

  ngOnInit(): void {
    this.getAllTasks();
  }

  getAllTasks() {
    this._tasksSvc
      .getTasks()
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        tap((tasksR: TaskFront[]) => this.tasks.set(tasksR))
      )
      .subscribe();
  }
}
