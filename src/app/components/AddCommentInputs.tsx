"use client";
import { TextField, Button, Box } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { domin_name } from "../utils/DOMIN";
import { useRouter } from "next/navigation";

interface IId {
  id: string;
}

const AddCommentInputs = ({ id }: IId) => {
  const router = useRouter();
  const [addComment, setAddComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleAddComment = async () => {
    if (addComment.trim() === "") {
      return;
    }
    // console.log("type id is : ",typeof +id);

    setIsLoading(true);

    try {
      if (isNaN(+id)) {
        throw new Error();
      }
      const body = {
        text: addComment,
        articleId: +id,
      };

      await axios.post(`${domin_name}/api/comments`, body);

      router.refresh();
      setAddComment(""); // Clear input after successful submission
      // window.location.reload();
    } catch (error) {

      // console.log("Error adding comment:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box className="flex flex-col gap-2">
      <TextField
        value={addComment}
        id="comment"
        label="Add your comment"
        variant="outlined"
        multiline
        maxRows={4}
        fullWidth
        onChange={(e) => setAddComment(e.target.value)}
        disabled={isLoading}
      />

      <Button
        variant="contained"
        onClick={handleAddComment}
        disabled={!addComment.trim() || isLoading}
      >
        {isLoading ? "Adding..." : "Add"}
      </Button>
    </Box>
  );
};

export default AddCommentInputs;
