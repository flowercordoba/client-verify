import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionRoutingModule } from './gestion-routing.module';
import { GestionComponent } from './gestion.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ChartModule } from 'src/app/components/chart/chart.module';
import { ListaGestionesComponent } from './pages/lista-gestiones/lista-gestiones.component';
import { TablesModule } from 'src/app/components/tables/tables.module';
import { FormulariosModule } from 'src/app/components/formularios/formularios.module';


@NgModule({
  declarations: [
    GestionComponent,
    ListaGestionesComponent
  ],
  imports: [
    CommonModule,
    GestionRoutingModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    ChartModule,
    TablesModule,
    FormulariosModule
  ]
})
export class GestionModule { }
