import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Page404Component } from './shared/page404/page404.component';
import { SignoutComponent } from './modules/auth/pages/signout/signout.component';
import { TerminosCondicionesComponent } from './components/index/terminos-condiciones/terminos-condiciones.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard',
  // canActivate:[AuthGuard],
  loadChildren: () => import('./modules/dashboard/dashboard.module').then((m) => m.DashboardModule) },
  {path:'auth',loadChildren:()=>import('./modules/auth/auth.module').then(m=>m.AuthModule)},
  {
    path: "logout", component:SignoutComponent
  },
  {
    path: "terminos", component:TerminosCondicionesComponent
  },

  
  { path: '**', component: Page404Component },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
