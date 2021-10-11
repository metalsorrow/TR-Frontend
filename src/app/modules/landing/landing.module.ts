import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { LandingRoutingModule } from './landing-routing.module';
import { IndexComponent } from './pages/home/index.component';
import { DepartmentDetailLoginComponent } from './pages/department-detail-login/department-detail-login.component';


@NgModule({
  declarations: [IndexComponent, DepartmentDetailLoginComponent],
  imports: [
    SharedModule,
    LandingRoutingModule
  ]
})
export class LandingModule { }
