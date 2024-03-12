import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { InputGroupComponent } from './input-group/input-group.component';
import { ModalsModule } from '../modals/modals.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    InputComponent,
    InputGroupComponent
  ],
  imports: [
    CommonModule,
    ModalsModule,
    RouterModule,
    FormsModule,  
    ReactiveFormsModule  
  ],
  exports: [
    InputComponent,
    InputGroupComponent,
  ]
})
export class FormulariosModule { }
