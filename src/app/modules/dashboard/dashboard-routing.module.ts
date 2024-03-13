import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { DashboardHomeComponent } from './pages/dashboard-home/dashboard-home.component';

const routes: Routes = [
  {path:'',component:DashboardComponent,
  children:[

    {path:'home',component:DashboardHomeComponent},
    {path:'users',loadChildren:()=>import('../user/user.module').then(m=>m.UserModule)},
    {path:'gestion',loadChildren:()=>import('../gestion/gestion.module').then(m=>m.GestionModule)},
    {path:'liquidez',loadChildren:()=>import('../liquidez/liquidez.module').then(m=>m.LiquidezModule)},
    {path:'solvencia',loadChildren:()=>import('../solvencia/solvencia.module').then(m=>m.SolvenciaModule)},
    {path:'rentabilidad',loadChildren:()=>import('../rentabilidad/rentabilidad.module').then(m=>m.RentabilidadModule)},
    {path:'riesgo-pais',loadChildren:()=>import('../r-pais/r-pais.module').then(m=>m.RPaisModule)},

  ]},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
