import {useMutation,  UseMutationResult,useQueryClient } from '@tanstack/react-query';
import { UpdateUserSchemaType } from '../_Validations/UpdateUserInfoValidation';
import userApi from '../Repo/resUserInfo';


export const useEditUserName= (onSuccess:()=>void):UseMutationResult<void,Error,{data:UpdateUserSchemaType,id:string|number}>=>{
    const queryClient=useQueryClient();
return useMutation({
    mutationFn:({data,id}:{data:UpdateUserSchemaType,id:string|number})=>userApi.editUsername(data,id),
onSuccess:()=>{
    onSuccess();
    queryClient.invalidateQueries({queryKey:["users"]});
    
},
onError:(error:Error)=>{
    console.error(error);
    
}
        
})

}
