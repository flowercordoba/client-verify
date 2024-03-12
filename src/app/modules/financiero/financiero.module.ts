import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinancieroRoutingModule } from './financiero-routing.module';
import { FinancieroComponent } from './financiero.component';
import { ChartModule } from 'src/app/components/chart/chart.module';


@NgModule({
  declarations: [
    FinancieroComponent
  ],
  imports: [
    CommonModule,
    FinancieroRoutingModule,
    ChartModule
  ]
})
export class FinancieroModule { }
