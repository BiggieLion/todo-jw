import { Routes } from '@angular/router';

const taskRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/list.component').then((m) => m.ListComponent),
  },
];

export default taskRoute;
