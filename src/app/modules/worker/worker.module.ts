import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkerRoutingModule } from './worker-routing.module';
import { SharedModule } from '../shared/shared.module';
import { BookingManagerComponent } from './pages/booking-manager/booking-manager.component';
import { WorkerLayoutComponent } from './components/worker-layout/worker-layout.component';
import { DisponibilityComponent } from './pages/disponibility/disponibility.component';
import { HomeComponent } from './pages/home/home.component';



@NgModule({
  declarations: [
    BookingManagerComponent,
    WorkerLayoutComponent,
    DisponibilityComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    WorkerRoutingModule,
    SharedModule
  ]
})
export class WorkerModule { }
