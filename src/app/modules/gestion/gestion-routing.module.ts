import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionComponent } from './gestion.component';
import { ListaGestionesComponent } from './pages/lista-gestiones/lista-gestiones.component';

const routes: Routes = [
  {path:'',component:GestionComponent,
children:[
  {path:'lista',component:ListaGestionesComponent}
]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionRoutingModule { }
