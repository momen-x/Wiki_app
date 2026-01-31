import { useMutation,useQueryClient,UseMutationResult } from "@tanstack/react-query";
import { CreateArticleSchemaType } from "../_Validation/CreateAndEditArticleSchema";
import CreateArticleApi from "../Repo/resArticle";

export const useCreateArticle = (onSuccess:()=>void): UseMutationResult<void, Error, CreateArticleSchemaType> => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateArticleSchemaType) => CreateArticleApi.createArticle(data),
        onSuccess: () => {
            onSuccess();
            queryClient.invalidateQueries({ queryKey: ['articles'] });
        },
        onError: (error: Error) => {
            console.error('Error creating article:', error);
        },
    });

}