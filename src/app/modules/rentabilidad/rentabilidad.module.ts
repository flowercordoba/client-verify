import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RentabilidadRoutingModule } from './rentabilidad-routing.module';
import { RentabilidadComponent } from './rentabilidad.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ChartModule } from 'src/app/components/chart/chart.module';
import { FormulariosModule } from 'src/app/components/formularios/formularios.module';
import { TablesModule } from 'src/app/components/tables/tables.module';


@NgModule({
  declarations: [
    RentabilidadComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RentabilidadRoutingModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    ChartModule,
    TablesModule,
    FormulariosModule
  ]
})
export class RentabilidadModule { }
