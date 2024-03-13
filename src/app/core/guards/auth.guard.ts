// import { Injectable } from '@angular/core';
// import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
// import { Observable, of } from 'rxjs';
// import { catchError, map } from 'rxjs/operators';
// import { AuthService } from 'src/app/modules/auth/services/auth.service';
// import { UserService } from 'src/app/modules/user/services/user.service';

// @Injectable({ providedIn: 'root' })
// export class AuthGuard implements CanActivate {
//   constructor(private userService: AuthService, private router: Router) {}

//   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
//     return this.userService.getToken().pipe(
//       map((resp: any) => {
//         console.log(resp);
//         // Aquí puedes poner la lógica para determinar si el usuario está autenticado
//         return true; // o false según tu lógica
//       }),
//       catchError((error) => {
//         console.error(error);
//         // Aquí puedes manejar el error y redirigir al usuario, por ejemplo:
//         this.router.navigate(['/login']);
//         return of(false);
//       })
//     );
//   }
// }