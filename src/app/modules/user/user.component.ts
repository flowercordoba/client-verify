import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent  {

  // totalUsuarios: number = 0; // Ahora guardaremos el total de usuarios

  // constructor(private userService: UserService) {}

  // ngOnInit(): void {
  //   this.getUsers();
  // }

  // getUsers(): void {
  //   this.userService.getUsers().subscribe({
  //     next: (response: any) => {
  //       this.totalUsuarios = response.total; 
  //     },
  //     error: (err) => console.error(err),
  //   });
  // }
}
