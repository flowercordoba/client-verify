export class UserModel {
  id: string;
  name: string;
  email: string;
  emailValidated: boolean;
  role: string;

  token: string;
 
  constructor(model: UserModel) {
    this.name = model.name || '';
    this.email = model.email || '';
    this.role = model.role || 'USER_ROLE';
    this.emailValidated = !!model.emailValidated;
    this.id = model.id || '';
    this.token = model.token || '';
  }
}
