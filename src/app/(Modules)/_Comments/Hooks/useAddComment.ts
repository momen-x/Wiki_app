import { useMutation,UseMutationResult,useQueryClient } from "@tanstack/react-query";
import { CreateCommentSchemaType } from "../Validation/CreateAndEditComment";
import CommentApi from "../Repo/resComment";

export const  useAddComment=(onSuccess:()=>void) :UseMutationResult<void,Error,CreateCommentSchemaType>=>{
    const queryClient=useQueryClient();
return useMutation({
    mutationFn:(data:CreateCommentSchemaType)=>CommentApi.addComment(data),
    onSuccess:()=>{
        onSuccess();
        queryClient.invalidateQueries({queryKey:["comments"]});
    },
onError:(error)=>{
    console.error("Error creating comment:", error);
}
}

)
    
}