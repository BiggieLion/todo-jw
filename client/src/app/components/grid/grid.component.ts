import { ChangeDetectionStrategy, Component, effect, input, OnInit, signal, viewChild } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FilterComponent } from './filter/filter.component';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TaskService } from '@core/services/task.service';
import { map } from 'rxjs';
import { DatePipe } from '@angular/common';
import { ModalService } from '@components/modal/modal.service';
import { ModalComponent } from '@components/modal/modal.component';

const MODULES = [MatCheckboxModule, MatIcon, MatButtonModule, MatTableModule, MatPaginator, FilterComponent, DatePipe];

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: MODULES,
  templateUrl: './grid.template.html',
  styleUrls: ['./grid.styles.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridComponent<T> implements OnInit {
  private readonly _paginator = viewChild.required<MatPaginator>(MatPaginator);

  displayedColumns = input.required<string[]>();
  data = input.required<T[]>();

  dataSource = new MatTableDataSource<T>();
  valueToFilter = signal<string>('');

  constructor(
    private readonly taskSvc: TaskService,
    private readonly modalSvc: ModalService
  ) {
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
    this.dataSource.paginator = this._paginator();
  }

  onChecked(isChecked: boolean): void {
    console.log('isChecked', isChecked);
  }

  editTask(data: T): void {
    this.modalSvc.openModal<ModalComponent, T>(ModalComponent, data);
  }

  deleteTask(id: number): void {
    const confirmation = confirm('¿Estás seguro de eliminar la tarea?');
    if (confirmation) {
      this.taskSvc.deleteTask(id).subscribe();
    }
  }
}
