import { useMutation,UseMutationResult,useQueryClient } from "@tanstack/react-query";
import CommentApi from "../Repo/resComment";

export const  useDeleteComment=(onSuccess:()=>void) :UseMutationResult<void,Error,{id:string|number}>=>{
    const queryClient=useQueryClient();
return useMutation({
    mutationFn:({id}:{id:string|number})=>CommentApi.deleteComment(id),
    onSuccess:()=>{
        onSuccess();
        queryClient.invalidateQueries({queryKey:["comments"]});
    },
onError:(error)=>{
    console.error("Error deleting comment:", error);
}
}

)
    
}