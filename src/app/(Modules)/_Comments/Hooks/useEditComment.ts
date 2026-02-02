import { useMutation,UseMutationResult,useQueryClient } from "@tanstack/react-query";
import { UpdateCommentSchemaType } from "../Validation/CreateAndEditComment";
import CommentApi from "../Repo/resComment";

export const  useEditComment=(onSuccess:()=>void) :UseMutationResult<void,Error,{id:string|number,data:UpdateCommentSchemaType}>=>{
    const queryClient=useQueryClient();
return useMutation({
    mutationFn:({id,data}:{id:string|number,data:UpdateCommentSchemaType})=>CommentApi.editComment(id,data),
    onSuccess:()=>{
        onSuccess();
        queryClient.invalidateQueries({queryKey:["comments"]});
    },
onError:(error)=>{
    console.error("Error updating comment:", error);
}
}

)
    
}