import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthTokenInterceptor } from './auth-token.interceptor';
import { HttpConfigInterceptor } from './http-config.interceptor';

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: AuthTokenInterceptor, multi: true },
];
