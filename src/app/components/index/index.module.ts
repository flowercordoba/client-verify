import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainComponent } from './contain/contain.component';
import { ModalsComponent } from './modals/modals.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchComponent } from './search/search.component';
import { TerminosCondicionesComponent } from './terminos-condiciones/terminos-condiciones.component';
import { PoliticaTDatosComponent } from './politica-tdatos/politica-tdatos.component';
import { CardUserComponent } from './card-user/card-user.component';
import { TotalCardUserComponent } from './total-card-user/total-card-user.component';
import { TotalCardCompanyComponent } from './total-card-company/total-card-company.component';
import { GraficStadisticaGeneralComponent } from './grafic-stadistica-general/grafic-stadistica-general.component';
import { GraficIndiceGeneralComponent } from './grafic-indice-general/grafic-indice-general.component';
import { ButtonToggleMenuComponent } from './button-toggle-menu/button-toggle-menu.component';
import { ButtonToggleProfileComponent } from './button-toggle-profile/button-toggle-profile.component';
import { CardBalanceGeneralComponent } from './card-balance-general/card-balance-general.component';
import { ListEmpresaComponent } from './list-empresa/list-empresa.component';
import { ListUsuariosComponent } from './list-usuarios/list-usuarios.component';
import { ChartModule } from '../chart/chart.module';
import { TablesModule } from '../tables/tables.module';



@NgModule({
  declarations: [
    ProfileComponent,
    ContainComponent,
    ModalsComponent,
    SearchComponent,
    TerminosCondicionesComponent,
    PoliticaTDatosComponent,
    CardUserComponent,
    TotalCardUserComponent,
    TotalCardCompanyComponent,
    GraficStadisticaGeneralComponent,
    GraficIndiceGeneralComponent,
    ButtonToggleMenuComponent,
    ButtonToggleProfileComponent,
    CardBalanceGeneralComponent,
    ListEmpresaComponent,
    ListUsuariosComponent
  ],
  imports: [
    CommonModule,
    ChartModule,
    TablesModule
  ],
  exports:[
    ProfileComponent,
    ContainComponent,
    ModalsComponent,
    SearchComponent,
    TerminosCondicionesComponent,
    PoliticaTDatosComponent,
    CardUserComponent,
    TotalCardUserComponent,
    TotalCardCompanyComponent,
    GraficStadisticaGeneralComponent,
    GraficIndiceGeneralComponent,
    ButtonToggleMenuComponent,
    ButtonToggleProfileComponent,
    CardBalanceGeneralComponent,
    ListEmpresaComponent,
    ListUsuariosComponent
  ]
})
export class IndexModule { }
