import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: [ localStorage.getItem('email') || '', [Validators.required, Validators.email]], 
      password: ['', [Validators.required]],
      // rememberme: [false]
    });
  }



  onLogin(): void {
    if (this.loginForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, completa todos los campos requeridos.',
      });
      return; 
    }
    
    const credentials = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };
  
    this.authService.login(credentials).subscribe({
      next: (response: any) => {
        if (this.loginForm.get('rememberme')?.value) {
          localStorage.setItem('email', this.loginForm.get('email')?.value);
        } else {
          localStorage.removeItem('email');
        }
        console.log('Inicio de sesión exitoso:', response);
        Swal.fire({
          icon: 'success',
          title: 'Inicio de sesión exitoso',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          this.router.navigateByUrl('/dashboard'); 
        });
      },
      error: (error: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Error en el inicio de sesión',
          text: 'Usuario o contraseña incorrectos',
        });
        console.error('Error en el inicio de sesión:', error);
      }
    });
  }

}
