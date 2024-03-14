// src/app/models/user.model.ts

export class UserModel {
  id?: string;
  name: string;
  email: string;
  token:string 
  emailValidated?: boolean;
  password?: string;
  img?: string;
  role: string[];

  constructor({
    id = '',
    name,
    email,
    emailValidated = false,
    password = '',
    img = '',
    token = '',
    role = ['USER_ROLE'],
  }: {
    id?: string;
    name: string;
    token: string;
    email: string;
    emailValidated?: boolean;
    password?: string;
    img?: string;
    role?: string[];
  }) {
    this.id = id;
    this.name = name;
    this.token = token;
    this.email = email;
    this.emailValidated = emailValidated;
    this.password = password;
    this.img = img;
    this.role = role;
  }
}
