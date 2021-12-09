import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingComponent } from './pages/booking/booking.component';
import { DepartmentDetailComponent } from './pages/department-detail/department-detail.component';
import { HomeComponent } from './pages/home/home.component';
import { OrderPayComponent } from './pages/order-pay/order-pay.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'booking',
    component: BookingComponent,
  },
  {
    path: 'department/:id',
    component: DepartmentDetailComponent,
  },
  {
    path: 'order',
    component: OrderPayComponent,
  },
];
@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRoutingModule {}
