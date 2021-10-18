import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { DepartmentsComponent } from './pages/departments/departments.component';
import { UsersComponent } from './pages/users/users.component';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { MaintenanceFormComponent } from './components/maintenance-form/maintenance-form.component';
import { DepartmentFormComponent } from './components/department-form/department-form.component';

@NgModule({
  declarations: [DepartmentsComponent, UsersComponent, AdminLayoutComponent, HomeComponent, UserFormComponent, MaintenanceFormComponent, DepartmentFormComponent],
  imports: [SharedModule, AdminRoutingModule],
})
export class AdminModule {}
