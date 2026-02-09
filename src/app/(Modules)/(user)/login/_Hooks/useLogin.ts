// useLogin.ts file 
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify"; // Changed to react-toastify since that's what you're using
import { loginAction } from "./actions";
import { LoginSchemaType } from "../_Validations/LoginValidation";

export const useLogin = (): UseMutationResult<
  { message: string; success: boolean },
  Error,
  LoginSchemaType
> => {
  const router = useRouter();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: loginAction,
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message || "Login successful!");
        queryClient.invalidateQueries({ queryKey: ["user-session"] });
        router.push("/");
        router.refresh();
      } else {
        // Show error message from server
        toast.error(data.message);
      }
    },
    onError: (error) => {
      toast.error("An unexpected error occurred during login.");
      console.error("Login Mutation Error:", error);
    },
  });
};