import { Routes } from '@angular/router';

import { Login } from './features/autenticacao/login/login';
import { Listagem } from './features/alunos/listagem/listagem';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: 'login',
    component: Login
  },
  {
    path: 'alunos',
    component: Listagem
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];