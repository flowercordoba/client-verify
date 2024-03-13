import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RPaisComponent } from './r-pais.component';

const routes: Routes = [{path:'',component:RPaisComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RPaisRoutingModule { }
