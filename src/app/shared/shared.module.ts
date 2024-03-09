import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { MenuSidebarComponent } from './menu-sidebar/menu-sidebar.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { Page404Component } from './page404/page404.component';



@NgModule({
  declarations: [
    SidebarComponent,
    HeaderComponent,
    MenuSidebarComponent,
    FooterComponent,
    Page404Component
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    Page404Component
  ]
})
export class SharedModule { }
