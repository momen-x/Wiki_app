"use client"
import { TextField, Button, Box } from "@mui/material";
import { useState } from "react";
const AddCommentInputs = () => {
    const [addComment,setAddComment]=useState('');
  return (
  <Box className="flex flex-col gap-2">
        <TextField
          value={addComment}
          id="comment"
          label="add your comment"
          variant="outlined"
          maxRows={4}
          onChange={(e) => {
            setAddComment(e.target.value);
          }}
        />
       
        <Button variant="contained">Add</Button>
      </Box>  )
}

export default AddCommentInputs