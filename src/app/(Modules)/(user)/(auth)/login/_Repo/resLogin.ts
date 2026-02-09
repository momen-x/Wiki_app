// resLogin.ts file 
import Login from "./Login";
import LoginSchema, { LoginSchemaType } from "../_Validations/LoginValidation";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export const userLogin: Login = {
  login: async (data: LoginSchemaType) => {
    try {
      const validation = LoginSchema.safeParse(data);
      if (!validation.success) {
        return {
          success: false,
          message: "Invalid email or password format",
        };
      }
      const { email, password } = validation.data;

      // Set redirect to false to handle the response ourselves
      const result = await signIn("credentials", { 
        email, 
        password, 
        redirect: false 
      });

      // Check if sign in was successful
      if (result?.error) {
        return {
          success: false,
          message: "Invalid credentials, please check your email or password",
        };
      }
      
      // If we reach here, login was successful
      return { success: true, message: "Login successful" };
      
    } catch (error) {
      // Handle AuthError (invalid credentials, etc.)
      if (error instanceof AuthError) {
        switch (error.type) {
          case "CredentialsSignin":
            return {
              success: false,
              message: "Invalid credentials, please check your email or password",
            };
          default:
            return {
              success: false,
              message: "Something went wrong, please try again later",
            };
        }
      }

      // Log unexpected errors
      console.error("Unexpected login error:", error);
      return { 
        success: false, 
        message: "An unexpected server error occurred" 
      };
    }
  },
};