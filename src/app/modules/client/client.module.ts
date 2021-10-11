import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ClientRoutingModule } from './client-routing.module';
import { BookingComponent } from './pages/booking/booking.component';
import { HomeComponent } from './pages/home/home.component';
import { DepartmentDetailComponent } from './pages/department-detail/department-detail.component';

@NgModule({
  declarations: [BookingComponent, HomeComponent, DepartmentDetailComponent],
  imports: [SharedModule, ClientRoutingModule],
})
export class ClientModule {}
