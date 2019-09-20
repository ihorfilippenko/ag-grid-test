import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './grid-page/landing-page.component';

import { AgGridModule } from 'ag-grid-angular';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    AgGridModule.withComponents([])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
