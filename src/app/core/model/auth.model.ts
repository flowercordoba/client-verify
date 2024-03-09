
export class AuthModel {
  username: string;
  lastname: string | undefined;
  password: string;
  email: string;
  avatarColor: string;
  // _id: string;
  // authId: string;
  // uId: string;
  avatarImage?: string;


  constructor(
    username: string = "",
    lastname: string = "",
    password: string = "",
    email: string = "",
    avatarColor: string = "",
    avatarImage?: string 
  ) {
    this.username = username;
    this.lastname = lastname;
    this.password = password;
    this.email = email;
    this.avatarColor = avatarColor;
    this.avatarImage = avatarImage;
    // this._id = '';
    // this.authId = '';
    // this.uId = '';
  }
}
