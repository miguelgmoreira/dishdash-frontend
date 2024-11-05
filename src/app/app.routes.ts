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
          {
            path: 'novo',
            loadComponent: () =>
              import('./features/menu/create-menu-item/create-menu-item.component').then(
                (m) => m.CreateMenuItemComponent
              ),
          },
          {
            path: 'editar/:id',
            loadComponent: () =>
              import('./features/menu/edit-menu-item/edit-menu-item.component').then(
                (m) => m.EditMenuItemComponent
              ),
          },
          {
            path: 'categoria',
            children: [
              {
                path: 'novo',
                loadComponent: () => 
                  import('./features/menu/create-menu-category/create-menu-category.component').then(
                    (m) => m.CreateMenuCategoryComponent
                  )
              }
            ]
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
