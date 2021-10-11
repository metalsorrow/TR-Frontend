import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { DepartmentsComponent } from './pages/departments/departments.component';
import { UsersComponent } from './pages/users/users.component';
import { CheckControllerComponent } from './pages/check-controller/check-controller.component';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';

@NgModule({
  declarations: [DepartmentsComponent, UsersComponent, CheckControllerComponent, AdminLayoutComponent],
  imports: [SharedModule, AdminRoutingModule],
})
export class AdminModule {}
