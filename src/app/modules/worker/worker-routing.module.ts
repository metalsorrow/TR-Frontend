import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '@worker/pages/home/home.component';
import { BookingManagerComponent } from './pages/booking-manager/booking-manager.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'bookingManager',
    component: BookingManagerComponent,
  },

];
@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkerRoutingModule { }
