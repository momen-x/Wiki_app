import { CreateArticleSchemaType } from "../_Validation/CreateAndEditArticleSchema"

interface Article{
createArticle:(data:CreateArticleSchemaType)=>Promise<void>
}

export default Article