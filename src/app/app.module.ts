import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './modules/shared/shared.module';
import { LandingLayoutComponent } from '@landing/components/landing-layout/landing-layout.component';
import { AuthLayoutComponent } from '@auth/components/auth-layout/auth-layout.component';
import { ClientLayoutComponent } from '@client/components/client-layout/client-layout.component';

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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
