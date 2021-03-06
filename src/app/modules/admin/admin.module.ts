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
import { InventoryDisplayComponent } from './components/inventory-display/inventory-display.component';
import { DisponibilityDetailsComponent } from './components/disponibility-details/disponibility-details.component';
import { DisponibilityComponent } from './pages/disponibility/disponibility.component';
import { TransportManagerComponent } from './pages/transport-manager/transport-manager.component';
import { TransportFormComponent } from './components/transport-form/transport-form.component';

@NgModule({
  declarations: [
    DepartmentsComponent,
    UsersComponent,
    AdminLayoutComponent,
    HomeComponent,
    UserFormComponent,
    MaintenanceFormComponent,
    DepartmentFormComponent,
    InventoryDisplayComponent,
    DisponibilityDetailsComponent,
    DisponibilityComponent,
    TransportManagerComponent,
    TransportFormComponent
  ],
  imports: [SharedModule, AdminRoutingModule],
})
export class AdminModule { }
