import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";
import { userLogin } from "../_Repo/resLogin";
import { LoginSchemaType } from "../_Validations/LoginValidation";
import { useRouter } from "next/navigation";


export const useLogin = (onSuccess:()=>void):UseMutationResult<
  void,Error,
  { email: string; password:string }
> => {
const route=useRouter();
    const queryClient = useQueryClient();
       return useMutation({
    mutationFn: (data: LoginSchemaType) =>
      userLogin.login(data),
    onSuccess: (_data, variables) => {
      onSuccess();
      queryClient.invalidateQueries({
        queryKey: ["login",variables.email],
      });
           
    },

    onError: (error) => {
      console.error("Error login in !!:", error?.message);
    },
  });
}