import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './modules/shared/shared.module';
import { LandingLayoutComponent } from '@landing/components/landing-layout/landing-layout.component';
import { AuthLayoutComponent } from '@auth/components/auth-layout/auth-layout.component';
import { ClientLayoutComponent } from '@client/components/client-layout/client-layout.component';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import localePy from '@angular/common/locales/es-CL';
import { registerLocaleData } from '@angular/common';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';


registerLocaleData(localePy, 'es');


const MY_FORMATS = {
  parse: {
    dateInput: 'DD MMMM YYYY',
  },
  display: {
    dateInput: 'DD MMMM YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};


@NgModule({
  declarations: [
    AppComponent,
    LandingLayoutComponent,
    AuthLayoutComponent,
    ClientLayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    SweetAlert2Module.forRoot()
  ],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    { provide: LOCALE_ID, useValue: 'es' }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
