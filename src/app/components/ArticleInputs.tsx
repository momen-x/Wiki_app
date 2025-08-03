"use client";
import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { domin_name } from "../utils/DOMIN";
import { useRouter } from "next/navigation";
const ArticleInputs = ({ id }: any) => {
  const [articleInput, setArticaleInput] = useState({ title: "", body: "" });
  const router = useRouter();
  const handleAddArticleByAdmin = async () => {
    try {
      const body = {
        userId: id,
        description: articleInput.body,
        title: articleInput.title,
      };
      axios.post(`${domin_name}/api/articles`, body);
      // console.log("added");
      setArticaleInput({ title: "", body: "" });
      router.refresh();
    } catch (error) {
      // console.log(error);
    }
  };
  return (
    <Box className="flex flex-col gap-2 ">
      <Typography variant="h4" component={"h3"}>
        Add New Article
      </Typography>
      <TextField
        value={articleInput.title}
        id="title"
        label="title"
        variant="outlined"
        maxRows={8}
        onChange={(e) => {
          setArticaleInput({ ...articleInput, title: e.target.value });
        }}
      />
      <TextField
        value={articleInput.body}
        onChange={(e) => {
          setArticaleInput({ ...articleInput, body: e.target.value });
        }}
        id="body"
        label="body"
        multiline
        rows={4}
        variant="outlined"
      />
      <Button variant="contained" onClick={handleAddArticleByAdmin}>
        Add
      </Button>
    </Box>
  );
};

export default ArticleInputs;
