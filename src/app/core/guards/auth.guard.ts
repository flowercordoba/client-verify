import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // Verifica si hay un token almacenado
    const token = this.authService.getToken();
    if (!token) {
      // Si no hay token, redirige a la página de inicio de sesión
      this.router.navigate(['/auth/login']);
      return false;
    }

    // Si necesitas validar el token contra el servidor, puedes descomentar y ajustar el siguiente bloque:
    /*
    return this.authService.validarToken().pipe(
      map(isValid => {
        if (!isValid) {
          this.router.navigate(['/auth/login']);
          return false;
        }
        return true;
      }),
      catchError((error) => {
        this.router.navigate(['/auth/login']);
        return of(false);
      })
    );
    */

    // Si solo estás verificando la existencia del token sin validar contra el servidor, usa esto:
    return true;
  }
}
