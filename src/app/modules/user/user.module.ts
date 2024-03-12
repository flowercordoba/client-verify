import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { ListComponent } from './pages/list/list.component';
import { UserIdComponent } from './pages/user-id/user-id.component';
import { UserIdUpdateComponent } from './pages/user-id-update/user-id-update.component';
import { TablesModule } from 'src/app/components/tables/tables.module';


@NgModule({
  declarations: [
    UserComponent,
    ListComponent,
    UserIdComponent,
    UserIdUpdateComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    TablesModule
  ]
})
export class UserModule { }
