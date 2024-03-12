import { Component } from '@angular/core';
import { UserService } from 'src/app/modules/user/services/user.service';

@Component({
  selector: 'app-total-card-user',
  templateUrl: './total-card-user.component.html',
  styleUrls: ['./total-card-user.component.scss']
})
export class TotalCardUserComponent {
  totalUsuarios: number = 0; // Ahora guardaremos el total de usuarios

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers().subscribe({
      next: (response: any) => {
        // Asegúrate de ajustar esta línea si el formato de la respuesta cambia
        this.totalUsuarios = response.total; // Ahora solo guardamos el total
      },
      error: (err) => console.error(err),
    });
  }

  

}
