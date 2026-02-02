import axios from "axios";
import Comment from "./Comment";
import { domain_name } from "@/app/utils/Domain";
import { CreateCommentSchemaType, UpdateCommentSchemaType } from "../Validation/CreateAndEditComment";


const URL=`${domain_name}/api/comments`;

const CommentApi:Comment={
    addComment:async (data:CreateCommentSchemaType)=>{
        try {
             await axios.post(`${URL}`, data);
        } catch (error) {
            console.error(error);
        }
    },
editComment:async (commentId:string|number,data:UpdateCommentSchemaType)=>{
    try {
          await axios.put(`${URL}/${commentId}`, { text:data.text});
    } catch (error) {
     console.error(error);
        
    }

},
    deleteComment:async (id:string|number)=>{
    try {
           await axios.delete(`${domain_name}/api/comments/${id}`);
    } catch (error) {
        console.error(error);
    }

}

}

export default CommentApi;