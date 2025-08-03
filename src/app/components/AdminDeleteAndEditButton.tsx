"use client";

import { Button } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { domin_name } from "../utils/DOMIN";
import { useRouter } from "next/navigation";
import EditArticleDialog from "./EditArticleDialog";
import EditCommentDialog from "./EditCommentDialog";

const AdminDeleteAndEditButton = ({
  id,
  userId,
  commentId,
  articleId,
  title,
  description,
}: any) => {
  const router = useRouter();
  const [openEditArticleDialpg, setopenEditArticleDialpg] = useState(false);
  const [openEditCommentDialpg, setopenEditCommentDialpg] = useState(false);

  const handleDelete = async () => {
    if (commentId) {
      try {
        if (confirm("are u sure u want delete this comment")) {
          const response = await axios.delete(
            `${domin_name}/api/comments/${commentId}`
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
          await axios.delete(`${domin_name}/api/articles/${articleId}`);

          router.refresh();
        }
      } catch {
        return;
      }
    }
  };

  const handleEditComment = () => {
    if (articleId) {
      setopenEditArticleDialpg(true);
    } else if (commentId) {
      setopenEditCommentDialpg(true);
    }
  };

  return (
    <React.Fragment>
      <EditArticleDialog
        props={{
          id: articleId,
          open: openEditArticleDialpg,
          setOpen: setopenEditArticleDialpg,
          title: title,
          description: description,
        }}
      />
      <EditCommentDialog
        props={{
          id: commentId,
          open: openEditCommentDialpg,
          setOpen: setopenEditCommentDialpg,
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
