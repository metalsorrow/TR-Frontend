import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentsComponent } from './pages/departments/departments.component';
import { UsersComponent } from './pages/users/users.component';

const routes: Routes = [
  {
    path: 'departments',
    component: DepartmentsComponent,
  },
  {
    path: 'users',
    component: UsersComponent,
  },
  // {
  //   path: 'booking',
  //   component: BookingsComponent
  // }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
