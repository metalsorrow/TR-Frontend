import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkerRoutingModule } from './worker-routing.module';
import { SharedModule } from '../shared/shared.module';
import { BookingManagerComponent } from './pages/booking-manager/booking-manager.component';
import { WorkerLayoutComponent } from './components/worker-layout/worker-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { ChecklistDialogComponent } from './components/checklist-dialog/checklist-dialog.component';
import { FinesComponent } from './components/fines/fines.component';
import { CheckInComponent } from './components/check-in/check-in.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { ExtraServicesManagerComponent } from './components/extra-services-manager/extra-services-manager.component';



@NgModule({
  declarations: [
    BookingManagerComponent,
    WorkerLayoutComponent,
    HomeComponent,
    ChecklistDialogComponent,
    FinesComponent,
    CheckInComponent,
    CheckOutComponent,
    ExtraServicesManagerComponent
  ],
  imports: [
    CommonModule,
    WorkerRoutingModule,
    SharedModule
  ]
})
export class WorkerModule { }
