import {
  CreateArticleSchemaType,
  UpdateArticleSchemaType,
} from "../_Validation/CreateAndEditArticleSchema";

interface Article {
  createArticle: (data: CreateArticleSchemaType) => Promise<void>;
  editArticle: (
    id: string | number,
    data: UpdateArticleSchemaType,
  ) => Promise<void>;
  deleteArticle: (id: string | number) => Promise<void>;}

export default Article;
