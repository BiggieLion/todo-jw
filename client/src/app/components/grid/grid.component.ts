import {
  Component,
  effect,
  inject,
  input,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FilterComponent } from './filter/filter.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ModalService } from '@components/modal/modal.service';
import { ModalComponent } from '@components/modal/modal.component';
import { DatePipe } from '@angular/common';
import { SnackbarService } from '@shared/services/snackbar.service';
import { TaskStore } from '@stores/task.store';
import { ITask } from '@features/tasks/tasks.interfaces';

const MATERIAL_IMPORTS = [
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
  MatButtonModule,
  MatIconModule,
];

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [FilterComponent, MATERIAL_IMPORTS, DatePipe],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss',
})
export class GridComponent<T> implements OnInit {
  private readonly _sort = viewChild.required<MatSort>(MatSort);
  private readonly _paginator = viewChild.required<MatPaginator>(MatPaginator);
  private readonly _modalSvc = inject(ModalService);
  private readonly _snackSvc = inject(SnackbarService);
  readonly _taskStore = inject(TaskStore);

  displayedColumns = input.required<any[]>();
  sortableColumns = input<string[]>([]);

  dataSource = new MatTableDataSource<ITask>();
  valueToFilter = signal('');

  logicColumn: string[] = ['id', 'title', 'notes', 'isDone', 'dueDate'];

  constructor() {
    effect(
      () => {
        if (this.valueToFilter()) {
          this.dataSource.filter = this.valueToFilter();
        } else {
          this.dataSource.filter = '';
        }

        if (this._taskStore.tasks()) {
          this.dataSource.data = this._taskStore.tasks();
        }
      },
      { allowSignalWrites: true }
    );
  }

  ngOnInit(): void {
    this.dataSource.data = this._taskStore.tasks();
    this.dataSource.sort = this._sort();
    this.dataSource.paginator = this._paginator();
  }

  onEdit(data: T): void {
    this._modalSvc.openModal<ModalComponent, T>(ModalComponent, data, true);
  }

  deleteTask(toRemove: ITask): void {
    const confirmation = confirm('¿Estás seguro de eliminar la tarea?');
    if (confirmation) {
      this._taskStore.deleteTask(toRemove);
      this._snackSvc.showSnackBar('Tarea eliminada');
    }
  }
}
