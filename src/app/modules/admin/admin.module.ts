import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { DepartmentsComponent } from './pages/departments/departments.component';
import { UsersComponent } from './pages/users/users.component';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';
import { HomeComponent } from './pages/home/home.component';

@NgModule({
  declarations: [DepartmentsComponent, UsersComponent, AdminLayoutComponent, HomeComponent],
  imports: [SharedModule, AdminRoutingModule],
})
export class AdminModule {}
