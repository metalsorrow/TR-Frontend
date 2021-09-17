import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ClientRoutingModule } from './client-routing.module';
import { ClientLayoutComponent } from './components/client-layout/client-layout.component';
import { BookingComponent } from './pages/booking/booking.component';



@NgModule({
  declarations: [
    ClientLayoutComponent,
    BookingComponent
  ],
  imports: [
    SharedModule,
    ClientRoutingModule
  ]
})
export class ClientModule { }
