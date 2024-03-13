import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";

import { environment } from "src/environments/environment";
import { IResgisterForm, UserModel } from "src/app/core";
import { IUser } from "src/app/core/interfaces/user.interfaces";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private base_url = environment.apiBaseUrl

  private usuarioSubject = new BehaviorSubject<IUser | null>(null);
  public usuario$ = this.usuarioSubject.asObservable(); 


  constructor(private http: HttpClient, private router: Router) {}


  signup(data: IResgisterForm): Observable<UserModel> {
    return this.http
      .post<UserModel>('http://localhost:3000/api/usuarios/register', data, {
        withCredentials: true,
      })
      .pipe(
        tap((resp) => {
          this.guardarLocalStorage(resp.token);
        })
      );
  }
  login(data: {
    email: string;
    password: string;
  }): Observable<UserModel> {
    return this.http
      .post<UserModel>(`http://localhost:3000/api/auth/login`, data, {
        withCredentials: true,
      })
      .pipe(
        tap((resp) => {
          console.log(resp.token);
          this.guardarLocalStorage(resp.token);
        })
      );
  }



// validarToken(): Observable<boolean> {
//   const token = this.getToken();
//   if (!token) {
//     return of(false);
//   }

//   return this.http.get<UserModel>(`${this.base_url}/auth/current`, { withCredentials: true })
//     .pipe(
//       tap((user) => {
//         console.log(user); 
//       }),
//       map(user => !!user),
//       catchError((error) => {
//         console.error("Error validando el token mediante /current", error);
//         this.logout();
//         return of(false);
//       })
//     );
// }

// validarToken(): Observable<boolean> {
//   const token = this.getToken();
//   if (!token) {
//     return of(false);
//   }

//   return this.http.get<IUser>(`${this.base_url}/auth/current`, { withCredentials: true })
//     .pipe(
//       tap((user) => {
//         console.log(user);
//         this.usuarioSubject.next(user);  
//       }),
//       map(user => !!user),
//       catchError((error) => {
//         console.error("Error validando el token mediante /current", error);
//         this.logout();
//         return of(false);
//       })
//     );
// }


  guardarLocalStorage(token: string): void {
    localStorage.setItem("token", token);
  }
  tokenExiste(): boolean {
    return !!localStorage.getItem("token");
  }
  // Obtener el token del localStorage
  getToken(): string {
    return localStorage.getItem("token") || "";
  }

  // logout(): void {
  //   // Realiza la petición al endpoint /signout del servidor
  //   this.http.get(`${this.base_url}/signout`, { withCredentials: true })
  //     .pipe(
  //       tap(() => {
  //         localStorage.removeItem('token'); // Limpia el token del localStorage
  //         this.router.navigateByUrl('/login'); // Redirige al usuario a la página de inicio de sesión
  //       })
  //     )
  //     .subscribe({
  //       next: (resp) => {
  //         console.log('Logout successful', resp);
  //       },
  //       error: (error) => {
  //         console.error('Error during logout', error);
  //       }
  //     });
  // }

  // authService.ts
  // logout(): void {
  //   this.http.post(`${this.base_url}/auth/signout`, {}, { withCredentials: true }).subscribe({
  //     next: () => {
  //       localStorage.removeItem('token'); // Asumiendo que el token se guarda bajo la clave 'token'
  //       this.router.navigate(['/auth/login']); // Redirige al usuario a la página de inicio de sesión
  //     },
  //     error: (error) => {
  //       console.error('Error during logout', error);
  //     }
  //   });
  // }
}
