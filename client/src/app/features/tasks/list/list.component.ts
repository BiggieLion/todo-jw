import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { GridComponent } from '@components/grid/grid.component';
import { TaskStore } from '@stores/task.store';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [GridComponent],
  template: `
    <section>
      <app-grid
        [displayedColumns]="displayColumns"
        [sortableColumns]="sortable"
      />
    </section>
  `,
  styles: ``,
})
export class ListComponent implements OnInit {
  taskStore = inject(TaskStore);

  displayColumns = [
    'ID',
    'Titulo',
    'Notas',
    'Estatus',
    'Vencimiento',
    'Acciones',
  ];

  sortable: string[] = ['ID', 'Titulo', 'Notas', 'Estatus', 'Vencimiento'];

  ngOnInit(): void {
    this.taskStore.getTasks();
  }
}
