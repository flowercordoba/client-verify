import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { IResgisterForm } from 'src/app/core';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  public formSubmitted = false;

  public registerForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(4)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    repassword: ['', [Validators.required, Validators.minLength(6)]],
    email: ['', [Validators.required, Validators.email]],
    terminos: [ false, Validators.required ],
  }, { validators: this.matchPasswords });

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService,
    private router: Router
    ) {}


registerUser() {
  this.formSubmitted = true;
  
  if (this.registerForm.invalid) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Por favor, completa el formulario correctamente.',
    });
    return;
  }

  const formData: IResgisterForm = {
    nombre: this.registerForm.get('nombre')!.value,
    password: this.registerForm.get('password')!.value,
    email: this.registerForm.get('email')!.value,
  };

  this.authService.signup(formData).subscribe({
    next: (resp) => {
      Swal.fire({
        icon: 'success',
        title: 'Registro exitoso',
        text: 'El usuario ha sido creado con éxito.',
      }).then((result) => {
        this.router.navigate(['/dashboard']); // Asegúrate de que esta ruta exista en tu app
      });
    },
    error: (err) => {
      console.log(err);
      Swal.fire({
        icon: 'error',
        title: 'Error al registrar',
        text: 'Hubo un problema al crear el usuario, por favor intenta de nuevo.',
      });
    }
  });
}

  notValidatedField(field: string): boolean {
    return this.formSubmitted && this.registerForm.get(field)!.invalid;
  }

  private matchPasswords(group: FormGroup): { [key: string]: any } | null {
    const password = group.get('password')!.value;
    const repassword = group.get('repassword')!.value;
    return password === repassword ? null : { notMatching: true };
  }

  aceptaTerminos() {
    return !this.registerForm.get('terminos')?.value && this.formSubmitted;
  }



}
