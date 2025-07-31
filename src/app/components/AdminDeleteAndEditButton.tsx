"use client";

import { Button } from "@mui/material";
import axios from "axios";
import React from "react";
import { domin_name } from "../utils/DOMIN";
import { useRouter } from "next/navigation";

// import React from "react";

const AdminDeleteAndEditButton = ({
  id,
  userId,
  commentId,
  articleId,
}: any) => {
  const router = useRouter();

  // console.log("comment >>>>>>> : ", commentId);
  // console.log(">>>>>>>>>>>>>>>:article ", articleId);

  const handleDeleteComment = async () => {
    if (commentId) {
      try {
        if (confirm("are u sure u want delete this comment")) {
          const response = axios.delete(
            `${domin_name}/api/comments/${commentId}`
          );
          console.log((await response).data);
          router.refresh();
        }
      } catch {
        return;
      }
    }
    if (articleId) {
        try {
          if (confirm("are u sure u want delete this article")) {
            const response = axios.delete(
              `${domin_name}/api/articles/${commentId}`
            );
            console.log((await response).data);
            router.refresh();
          }
        } catch {
          return;
        }
    }
  };

  return (
    <React.Fragment>
      {id === userId ? (
        <Button variant="contained" color="primary" sx={{ mx: "5px" }}>
          Edit
        </Button>
      ) : (
        ""
      )}
      <Button variant="contained" color="error" onClick={handleDeleteComment}>
        Delete
      </Button>
    </React.Fragment>
  );
};

export default AdminDeleteAndEditButton;
