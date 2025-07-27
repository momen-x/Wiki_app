import { Password } from "@mui/icons-material";
export interface IRegister {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IEditUserData {
  email?: string;
  password?: string;
  username?: string;
}

export interface ICreateComment {
  text: string;
  articleId: number;
}
export interface IEditComment{
  text:string;
}