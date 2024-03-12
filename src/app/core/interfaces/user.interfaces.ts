
export interface IUser {
    id?: string; // Opcional porque no se incluye al crear un usuario
    name: string;
    email: string;
    emailValidated?: boolean;
    password?: string; // Opcional en las operaciones de actualización y lectura
    img?: string;
    role: string[];
  }
  


  
export interface UserResponse {
    users: IUser[];
    total: number;
    // Otros campos como 'next' y 'prev' si es necesario
  }