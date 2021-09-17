import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { DepartmentsComponent } from './components/departments/departments.component';
import { UsersComponent } from './components/users/users.component';

@NgModule({
  declarations: [DepartmentsComponent, UsersComponent],
  imports: [SharedModule, AdminRoutingModule],
})
export class AdminModule {}
