import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BadgesLightenComponent } from './badges-lighten/badges-lighten.component';
import { PillBadgesComponent } from './pill-badges/pill-badges.component';



@NgModule({
  declarations: [
    BadgesLightenComponent,
    PillBadgesComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    BadgesLightenComponent,
    PillBadgesComponent
  ]
})
export class ModalsModule { }
