import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpresaComponent } from './empresa.component';
import { ListEmpresaComponent } from 'src/app/components/index/list-empresa/list-empresa.component';

const routes: Routes = [
  {
    path:'',
    component:EmpresaComponent
  },
  {
    path:'listar',
    component:ListEmpresaComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpresaRoutingModule { }
