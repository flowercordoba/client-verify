import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpresaRoutingModule } from './empresa-routing.module';
import { EmpresaComponent } from './empresa.component';
import { ListarComponent } from './pages/listar/listar.component';
import { TablesModule } from 'src/app/components/tables/tables.module';
import { FormulariosModule } from 'src/app/components/formularios/formularios.module';


@NgModule({
  declarations: [
    EmpresaComponent,
    ListarComponent
  ],
  imports: [
    CommonModule,
    EmpresaRoutingModule,
    TablesModule,
    FormulariosModule
  ]
})
export class EmpresaModule { }
