export interface User {
  password: string;
  email: string;
  name: string;
  surname: string;
  patronymic: string;
}

export interface UserSchema {
  authData?: User;

  _inited: boolean;
}
