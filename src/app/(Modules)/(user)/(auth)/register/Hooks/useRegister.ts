import {  useMutation,UseMutationResult,useQuery, useQueryClient } from "@tanstack/react-query";
import { RegisterSchemaType } from "../_Validation/RegisterValidation";
import userRegister from "../Repo/resRegister";


export const useRegister=(onSuccess:()=>void,onError:(error:any)=>void):UseMutationResult<void,Error,RegisterSchemaType>=>{
    const queryClient = useQueryClient();
   
    return useMutation({
      mutationFn: (data: RegisterSchemaType) => userRegister.register(data),
      onSuccess: (_data, variables) => {
        onSuccess();
        queryClient.invalidateQueries({
          queryKey: ["register", variables.email],
        });
      },

      onError: (error: any) => {
        console.error("❌ Registration error:", {
          message: error?.message,
          status: error?.response?.status,
          statusText: error?.response?.statusText,
          data: error?.response?.data,
          url: error?.config?.url,
        });
        onError(error);
      },
    });


}