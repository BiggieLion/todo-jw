import { Routes } from '@angular/router';

const tasksRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./list/list.component').then((m) => m.ListComponent),
  },
];

export default tasksRoutes;
