import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SolvenciaRoutingModule } from './solvencia-routing.module';
import { SolvenciaComponent } from './solvencia.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ChartModule } from 'src/app/components/chart/chart.module';
import { FormulariosModule } from 'src/app/components/formularios/formularios.module';
import { TablesModule } from 'src/app/components/tables/tables.module';


@NgModule({
  declarations: [
    SolvenciaComponent
  ],
  imports: [
    CommonModule,
    SolvenciaRoutingModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    ChartModule,
    TablesModule,
    FormulariosModule,
    ReactiveFormsModule
  ]
})
export class SolvenciaModule { }
