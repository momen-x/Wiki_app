import { useMutation,UseMutationResult,useQueryClient } from "@tanstack/react-query";
import ArticleApi from "../Repo/resArticle";

export const useDeleteArticle=(onSuccess:()=>void):UseMutationResult<void,Error,string|number>=>{
    const queryClient=useQueryClient();
    return useMutation({
        mutationFn:(id:string|number)=>ArticleApi.deleteArticle(id),
        onSuccess:()=>{
            onSuccess();
            queryClient.invalidateQueries({queryKey:["articles"]});
        },
        onError:(error:Error)=>{
            console.error("Error deleting article:",error);
        }
    })

}