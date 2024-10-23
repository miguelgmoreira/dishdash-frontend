import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginLayoutComponent } from './pages/login-layout/login-layout.component';
import { MainLayoutComponent } from './pages/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'admin/gerenciar-cardapio',
    pathMatch: 'full',
  },
  {
    path: 'admin',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'gerenciar-cardapio',
        loadComponent: () =>
          import('./features/gerenciar-cardapio/gerenciar-cardapio.component').then(
            (m) => m.CardapioComponent
          ),
      },
    ],
  },
  {
    path: '',
    component: LoginLayoutComponent,
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./auth/components/login/login.component').then(
            (m) => m.LoginComponent
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/cardapio',
  },
];
