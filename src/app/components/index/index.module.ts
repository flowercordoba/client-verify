import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainComponent } from './contain/contain.component';
import { ModalsComponent } from './modals/modals.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchComponent } from './search/search.component';
import { TerminosCondicionesComponent } from './terminos-condiciones/terminos-condiciones.component';
import { PoliticaTDatosComponent } from './politica-tdatos/politica-tdatos.component';



@NgModule({
  declarations: [
    ProfileComponent,
    ContainComponent,
    ModalsComponent,
    SearchComponent,
    TerminosCondicionesComponent,
    PoliticaTDatosComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    ProfileComponent,
    ContainComponent,
    ModalsComponent,
    SearchComponent,
    TerminosCondicionesComponent,
    PoliticaTDatosComponent
  ]
})
export class IndexModule { }
