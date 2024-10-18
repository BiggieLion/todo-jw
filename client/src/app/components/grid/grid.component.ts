import {
  Component,
  effect,
  inject,
  input,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInput } from '@angular/material/input';
import { FilterComponent } from './filter/filter.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ModalService } from '@components/modal/modal.service';
import { ModalComponent } from '@components/modal/modal.component';
import { TaskService } from '@features/tasks/tasks.service';
import { JsonPipe } from '@angular/common';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

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
  imports: [FilterComponent, MATERIAL_IMPORTS, JsonPipe],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss',
})
export class GridComponent<T> implements OnInit {
  private readonly _sort = viewChild.required<MatSort>(MatSort);
  private readonly _paginator = viewChild.required<MatPaginator>(MatPaginator);
  private readonly _modalSvc = inject(ModalService);
  private readonly _taskSvc = inject(TaskService);

  displayedColumns = input.required<string[]>();
  data = input.required<T[]>();
  sortableColumns = input<string[]>([]);

  dataSource = new MatTableDataSource<T>();
  valueToFilter = signal('');

  constructor() {
    effect(
      () => {
        if (this.valueToFilter()) {
          this.dataSource.filter = this.valueToFilter();
        } else {
          this.dataSource.filter = '';
        }

        if (this.data()) {
          this.dataSource.data = this.data();
        }
      },
      { allowSignalWrites: true }
    );
  }

  ngOnInit(): void {
    this.dataSource.data = this.data();
    this.dataSource.sort = this._sort();
    this.dataSource.paginator = this._paginator();
  }

  onEdit(data: T): void {
    this._modalSvc.openModal<ModalComponent, T>(ModalComponent, data, true);
  }

  deleteTask(id: number): void {
    const confirmation = confirm('¿Estás seguro de eliminar la tarea?');
    if (confirmation) {
      this._taskSvc.deleteTask(id).subscribe();
    }
  }
}
