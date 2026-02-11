import { domain_name } from "@/app/utils/Domain";
import { CreateArticleSchemaType, UpdateArticleSchemaType } from "../_Validation/CreateAndEditArticleSchema";
import Article from "./Article";
import axios from "axios";


const URL=`${domain_name}/api/articles`

const ArticleApi:Article={
    createArticle:async (data:CreateArticleSchemaType)=>{
       try {
 


      const body: CreateArticleSchemaType = {
        title: data.title,
        description: data.description,
        userId: Number(data.userId),
      };

    

      await axios.post(URL, body);
   
      
    } catch (error: any) {
      console.error("Error adding article:", error);


    }}
    ,
    editArticle:async (id:string|number,data:UpdateArticleSchemaType)=>{
try {

  await axios.put(`${URL}/${id}`,data);
  
  } catch (error) {
    console.error("Error updating article:", error);
    throw error; 
  }

},
deleteArticle:async (id:string|number)=>{
  try {
    const response = await axios.delete(`${URL}/${id}`);

  } catch (error) {
    console.error("Error deleting article:", error);
    throw error; 
  }
}

}

export default ArticleApi;