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
