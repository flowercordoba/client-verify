import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/core/interfaces/user.interfaces';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  users: IUser[] = [];
  totalUsuarios: number = 0;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  // getUsers(): void {
  //   this.userService.getUsers().subscribe({
  //     next: (response: any) => {
  //       this.users = response.users; // Asumiendo que la respuesta del backend sigue esta estructura
  //       this.totalUsuarios = response.total; // Extrae el total de usuarios
  //     },
  //     error: (err) => console.error('Error al obtener usuarios:', err),
  //   });
  // }


  getUsers(): void {
    this.userService.getUsers().subscribe({
      next: (response) => {
        console.log(response); // Añade esto para debuggear
        this.users = response.users;
        this.totalUsuarios = response.total;
      },
      error: (err) => console.error('Error al obtener usuarios:', err),
    });
  }
  

}
