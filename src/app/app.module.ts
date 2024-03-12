import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AuthModule } from './modules/auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { ProfileToggleService } from './shared/services/profile-toggle.service';
import { AuthInterceptor } from './core/guards/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule,
    SharedModule,
    
  ],
  providers: [
    ProfileToggleService,
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: AuthInterceptor,
      multi: true, 
    },
  ], 
  bootstrap: [AppComponent]
})
export class AppModule { }
