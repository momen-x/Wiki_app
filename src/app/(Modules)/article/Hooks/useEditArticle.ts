import {
  useMutation,
  useQueryClient,
  UseMutationResult,
} from "@tanstack/react-query";
import { UpdateArticleSchemaType } from "../_Validation/CreateAndEditArticleSchema";
import ArticleApi from "../Repo/resArticle";

export const useUpdateArticle = (
  onSuccess: () => void,
): UseMutationResult<void, Error,  { id: string | number; data: UpdateArticleSchemaType }> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string | number; data: UpdateArticleSchemaType }) =>
      ArticleApi.editArticle(id, data),
    onSuccess: () => {
      onSuccess();
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
    onError: (error: Error) => {
      console.error("Error creating article:", error);
    },
  });
};