"use client";

import { Button } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { domain_name } from "../utils/Domain";
import { useRouter } from "next/navigation";
import EditArticleDialog from "../(Modules)/article/[id]/_Components/EditArticleDialog";
import EditCommentDialog from "../(Modules)/article/_CommentsComponent/EditCommentDialog";

const AdminDeleteAndEditButton = ({
  id,
  userId,
  commentId,
  articleId,
  title,
  description,
}: any) => {
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
          id: articleId,
          open: openEditArticleDialog,
          setOpen: setOpenEditArticleDialog,
          title: title,
          description: description,
          userId: userId,
        }}
      />
      <EditCommentDialog
        props={{
          id: commentId,
          open: openEditCommentDialog,
          setOpen: setOpenEditCommentDialog,
        }}
      />
      {id === userId ? (
        <Button
          variant="contained"
          color="primary"
          sx={{ mx: "5px" }}
          onClick={handleEditComment}
        >
          Edit
        </Button>
      ) : (
        ""
      )}
      <Button variant="contained" color="error" onClick={handleDelete}>
        Delete
      </Button>
    </React.Fragment>
  );
};

export default AdminDeleteAndEditButton;
