import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '@admin/pages/home/home.component';
import { DepartmentsComponent } from '@admin/pages/departments/departments.component';
import { UsersComponent } from '@admin/pages/users/users.component';
import { DisponibilityComponent } from '@admin/pages/disponibility/disponibility.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'departments',
    component: DepartmentsComponent,
  },
  {
    path: 'users',
    component: UsersComponent,
  },
  {
    path: 'disponibility',
    component: DisponibilityComponent,
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
