"use server";

import { userLogin } from "../_Repo/resLogin";
import { LoginSchemaType } from "../_Validations/LoginValidation";



export async function loginAction(data: LoginSchemaType) {
  return userLogin.login(data);
}