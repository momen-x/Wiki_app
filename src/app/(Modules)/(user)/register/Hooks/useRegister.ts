import {  useMutation,UseMutationResult,useQuery, useQueryClient } from "@tanstack/react-query";
import { RegisterSchemaType } from "../_Validation/RegisterValidation";
import userRegister from "../Repo/resRegister";
import { toast } from "react-toastify";


export const useRegister=(onSuccess:()=>void,onError:(error:any)=>void):UseMutationResult<void,Error,RegisterSchemaType>=>{
    const queryClient = useQueryClient();
   
    return useMutation({
        mutationFn:(data:RegisterSchemaType)=>
            userRegister.register(data),
        onSuccess:(_data,variables)=>{
            onSuccess();
     queryClient.invalidateQueries({
            queryKey: ["register",variables.email],
          });
        
               
        },
    
        onError: (error) => {
            onError(error);
          console.error("Error registering user", error?.message);
        },}        
    )


}