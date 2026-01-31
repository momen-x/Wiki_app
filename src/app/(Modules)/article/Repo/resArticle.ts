import { domain_name } from "@/app/utils/Domain";
import { CreateArticleSchemaType } from "../_Validation/CreateAndEditArticleSchema";
import Article from "./Article";
import axios from "axios";

const CreateArticleApi:Article={
    createArticle:async (data:CreateArticleSchemaType)=>{
       try {
 


      const body: CreateArticleSchemaType = {
        title: data.title,
        description: data.description,
        userId: Number(data.userId),
      };

      await axios.post(`${domain_name}/api/articles`, body);
   
      
    } catch (error: any) {
      console.error("Error adding article:", error);


    }}
}

export default CreateArticleApi;