export enum AuthType {
   LOGIN = "login",
   REGISTER = "register",
}

export interface UserData {
   email: string;
   password: string;
   name: string;
   surname: string;
   patronymic: string;
}
