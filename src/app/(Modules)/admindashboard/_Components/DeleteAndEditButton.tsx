"use client";

import axios from "axios";
import React, { useState } from "react";
import { domain_name } from "../../../utils/Domain";
import { useRouter } from "next/navigation";
import EditArticleDialog from "../../article/[id]/_Components/EditArticleDialog";
import EditCommentDialog from "@/app/(Modules)/_Comments/Components/EditCommentDialog";
import { Button } from "../../../_Components/ui/button";


const DeleteAndEditButton = ({
  id,
  userId,
  commentId,
  articleId,
  title,
  description,
  commentText


}:{id:number,userId:number,commentId?:number,articleId?:number,title?:string,description?:string,commentText?:string} ) => {
  const router = useRouter();
  const [openEditArticleDialog, setOpenEditArticleDialog] = useState(false);
  const [openEditCommentDialog, setOpenEditCommentDialog] = useState(false);

  const handleDelete = async () => {
    if (commentId) {
      try {
        if (confirm("are u sure u want delete this comment")) {
          const response = await axios.delete(
            `${domain_name}/api/comments/${commentId}`,
          );

          router.refresh();
        }
      } catch {
        return;
      }
    }
    if (articleId) {
      try {
        if (confirm("are u sure u want delete this article")) {
          await axios.delete(`${domain_name}/api/articles/${articleId}`);

          router.refresh();
        }
      } catch {
        return;
      }
    }
  };

  const handleEditComment = () => {
    if (articleId) {
      setOpenEditArticleDialog(true);
    } else if (commentId) {
      setOpenEditCommentDialog(true);
    }
  };

  return (
    <React.Fragment>
      <EditArticleDialog
        props={{
          id: articleId||0,
          open: openEditArticleDialog,
          setOpen: setOpenEditArticleDialog,
          title: title ||"",
          description: description||"",
          userId: userId,
        }}
      />
      <EditCommentDialog
       
    open={openEditCommentDialog} setOpen={setOpenEditCommentDialog}  id={commentId||0} text={commentText||""}
      />
    
      {id === userId ? (
        <Button
          variant="default"
          color="primary"
          onClick={handleEditComment}
        >
          Edit
        </Button>
      ) : (
        ""
      )}
      <Button variant="destructive" color="error" onClick={handleDelete} style={{ marginLeft:"8px" }}>
        Delete
      </Button>
    </React.Fragment>
  );
};

export default DeleteAndEditButton;
