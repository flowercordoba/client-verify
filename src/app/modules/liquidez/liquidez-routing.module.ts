import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LiquidezComponent } from './liquidez.component';

const routes: Routes = [{path:'',component:LiquidezComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LiquidezRoutingModule { }
