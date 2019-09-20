import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';
import { HttpErrorInterceptor } from './http-error.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './grid-page/landing-page.component';
import { StatusBarComponent } from './grid-page/status-bar/status-bar.component';
import { CustomHeaderComponent } from './grid-page/custom-header/custom-header.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    StatusBarComponent,
    CustomHeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AgGridModule.withComponents([
      StatusBarComponent,
      CustomHeaderComponent
    ])
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
