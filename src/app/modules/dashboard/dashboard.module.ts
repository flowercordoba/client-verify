import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { IndexModule } from 'src/app/components/index/index.module';
import { DashboardHomeComponent } from './pages/dashboard-home/dashboard-home.component';


@NgModule({
  declarations: [
    DashboardComponent,
    DashboardHomeComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    // TablesModule,
    IndexModule,
    SharedModule
  ]

})
export class DashboardModule { }
