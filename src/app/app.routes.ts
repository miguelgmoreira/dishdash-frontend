import { Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { LoginLayoutComponent } from './pages/login-layout/login-layout.component';
import { MainLayoutComponent } from './pages/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'admin/cardapio',
    pathMatch: 'full',
  },
  {
    path: 'admin',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'cardapio',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./features/menu/manage-menu/manage-menu.component').then(
                (m) => m.ManageMenuComponent
              ),
          },
        ]
      }
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
    redirectTo: 'admin/cardapio',
  },
];
