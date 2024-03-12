import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectorFechaComponent } from './selector-fecha/selector-fecha.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SelectorFechaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    SelectorFechaComponent
  ]
})
export class FormDateModule { }
