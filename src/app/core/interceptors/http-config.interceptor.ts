import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const modifiedReq = req.clone({ 
      headers: req.headers
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json'),
      withCredentials: true
    });
    
    return next.handle(modifiedReq);
  }
}
