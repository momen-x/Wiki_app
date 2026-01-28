"use client";
import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { domain_name } from "../../../utils/Domain";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";

const ArticleInputs = ({ id }: { id: string }) => {
  const [articleInput, setArticleInput] = useState({ title: "", body: "" });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleAddArticleByAdmin = async () => {
    if (!articleInput.title || !articleInput.body) {
      toast.error("Title and Body are required!");
      return;
    }

    setIsLoading(true);
    try {
      const body = {
        userId: id,
        title: articleInput.title,
        description: articleInput.body,
      };

      await axios.post(`${domain_name}/api/articles`, body);

      toast.success("Article added successfully! 🎉");
      setArticleInput({ title: "", body: "" });
      router.refresh();
    } catch (error) {
      toast.error("Failed to add article. Please try again.");
      console.error("Error adding article:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box className="flex flex-col gap-2">
      <Typography variant="h4" component="h3">
        Add New Article
      </Typography>
      <TextField
        value={articleInput.title}
        id="title"
        label="Title"
        variant="outlined"
        onChange={(e) =>
          setArticleInput({ ...articleInput, title: e.target.value })
        }
      />
      <TextField
        value={articleInput.body}
        id="body"
        label="Body"
        multiline
        rows={4}
        variant="outlined"
        onChange={(e) =>
          setArticleInput({ ...articleInput, body: e.target.value })
        }
      />
      <Button
        variant="contained"
        onClick={handleAddArticleByAdmin}
        disabled={isLoading}
      >
        {isLoading ? "Adding..." : "Add"}
      </Button>

      {/* Toast Container (renders the toasts) */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Box>
  );
};

export default ArticleInputs;