import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RPaisRoutingModule } from './r-pais-routing.module';
import { RPaisComponent } from './r-pais.component';
import { ChartModule } from 'src/app/components/chart/chart.module';


@NgModule({
  declarations: [
    RPaisComponent
  ],
  imports: [
    CommonModule,
    RPaisRoutingModule,
    ChartModule
  ]
})
export class RPaisModule { }
