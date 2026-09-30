import { Routes } from '@angular/router';

import { Listagem } from './features/alunos/listagem/listagem';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'alunos'
  },
  {
    path: 'alunos',
    component: Listagem
  },
  {
    path: '**',
    redirectTo: 'alunos'
  }
];