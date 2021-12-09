import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ClientRoutingModule } from './client-routing.module';
import { BookingComponent } from './pages/booking/booking.component';
import { HomeComponent } from './pages/home/home.component';
import { DepartmentDetailComponent } from './pages/department-detail/department-detail.component';
import { ExtraServicesComponent } from './components/extra-services/extra-services.component';
import { DetailsDialogComponent } from './components/details-dialog/details-dialog.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { OrderPayComponent } from './pages/order-pay/order-pay.component';


@NgModule({
  declarations: [BookingComponent, HomeComponent, DepartmentDetailComponent, ExtraServicesComponent, DetailsDialogComponent, OrderPayComponent],
    
  imports: [SharedModule, ClientRoutingModule,SweetAlert2Module],
})
export class ClientModule {}
