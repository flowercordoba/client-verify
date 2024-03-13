// profile.component.ts
import { Component } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  usuario$ = this.authService.usuario$; 

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // this.authService.validarToken().subscribe({
    //   next: (isValid: boolean) => {
    //     if (!isValid) {
    //     }
    //   },
    //   error: (error: any) => {
    //     console.error("Hubo un error al obtener la información del usuario", error);
    //   }
    // });
  }
}
