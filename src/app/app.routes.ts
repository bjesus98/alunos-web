import { Routes } from '@angular/router';

import { authGuard } from './core/guards/auth.guard';
import { Cadastro } from './features/alunos/cadastro/cadastro';
import { Detalhes } from './features/alunos/detalhes/detalhes';
import { Listagem } from './features/alunos/listagem/listagem';
import { Login } from './features/autenticacao/login/login';

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
    component: Listagem,
    canActivate: [
      authGuard
    ]
  },
  {
    path: 'alunos/novo',
    component: Cadastro,
    canActivate: [
      authGuard
    ]
  },
  {
    path: 'alunos/:id',
    component: Detalhes,
    canActivate: [
      authGuard
    ]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];