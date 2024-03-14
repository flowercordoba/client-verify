import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Aquí es donde recuperarías el token de alguna manera, por ejemplo, desde localStorage
    const authToken = localStorage.getItem('authToken');

    // Verifica si el token existe antes de intentar añadirlo a los headers
    if (authToken) {
      // Clona la solicitud para añadirle el header de autorización
      const authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${authToken}`)
      });

      // Envía la solicitud clonada con el header de autorización
      return next.handle(authReq);
    }

    // Si no hay token, simplemente pasa la solicitud original
    return next.handle(req);
  }
}
