import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LiquidezRoutingModule } from './liquidez-routing.module';
import { LiquidezComponent } from './liquidez.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ChartModule } from 'src/app/components/chart/chart.module';
import { FormulariosModule } from 'src/app/components/formularios/formularios.module';
import { TablesModule } from 'src/app/components/tables/tables.module';
import { FormDateModule } from 'src/app/components/form-date/form-date.module';


@NgModule({
  declarations: [
    LiquidezComponent
  ],
  imports: [
    CommonModule,
    LiquidezRoutingModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    ChartModule,
    TablesModule,
    FormulariosModule,
    FormDateModule,
    ReactiveFormsModule, // Añade ReactiveFormsModule aquí

  ]
})
export class LiquidezModule { }
