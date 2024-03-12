import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeleccionComponent } from './seleccion/seleccion.component';
import { OverflowComponent } from './overflow/overflow.component';
import { HighLightedComponent } from './high-lighted/high-lighted.component';
import { StripedHoverableComponent } from './striped-hoverable/striped-hoverable.component';



@NgModule({
  declarations: [
    SeleccionComponent,
    OverflowComponent,
    HighLightedComponent,
    StripedHoverableComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    SeleccionComponent,
    OverflowComponent,
    HighLightedComponent,
    StripedHoverableComponent
  ]
})
export class TablesModule { }
