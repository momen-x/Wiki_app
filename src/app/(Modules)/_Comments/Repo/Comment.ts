import { CreateCommentSchemaType, UpdateCommentSchemaType } from "../Validation/CreateAndEditComment";

interface Comment{
    addComment:(data:CreateCommentSchemaType)=>Promise<void>,
    editComment:(commentId:string|number,data:UpdateCommentSchemaType)=>Promise<void>,
deleteComment:(commentId:string|number)=>Promise<void>
}

export default Comment;