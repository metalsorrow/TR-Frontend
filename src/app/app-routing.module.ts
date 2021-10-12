import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from '@auth/components/auth-layout/auth-layout.component';
import { ClientLayoutComponent } from '@client/components/client-layout/client-layout.component';
import { LandingLayoutComponent } from '@landing/components/landing-layout/landing-layout.component';
import { WorkerLayoutComponent } from '@worker/components/worker-layout/worker-layout.component';
import { AdminLayoutComponent } from './modules/admin/components/admin-layout/admin-layout.component';

const routes: Routes = [
  {
    path: '',
    component: LandingLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('@landing/landing.module').then((m) => m.LandingModule),
      },
    ],
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('@auth/auth.module').then((m) => m.AuthModule),
      },
    ],
  },
  {
    path: 'client',
    component: ClientLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('@client/client.module').then((m) => m.ClientModule),
      },
    ],
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('@admin/admin.module').then((m) => m.AdminModule),
      },
    ],
  },
  {
    path: 'worker',
    component: WorkerLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('@worker/worker.module').then((m) => m.WorkerModule),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
