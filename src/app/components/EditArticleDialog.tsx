"use client"
import React, { useState } from "react";
import { toast } from "sonner";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Stack,
  Typography,
  CircularProgress,
} from "@mui/material";
import { EditArticle } from "../utils/editArticle";
import { useRouter } from "next/navigation";

interface IProps {
  props: {
    id: number | string;
    open: boolean;
    setOpen: (open: boolean) => void;
    description: string;
    title: string;
  };
}

const EditArticleDialog = ({ props }: IProps) => {
  const router=useRouter();
  const [inputArticle, setInputArticle] = useState({
    title: props.title,
    description: props.description,
  });
  const [errors, setErrors] = useState({
    title: "",
    description: "", // ← fixed typo
  });
  const [loading, setLoading] = useState(false);
  // const router = useRouter();

  const handleClose = () => {
    props.setOpen(false);
    setInputArticle({ title: "", description: "" });
    setErrors({ title: "", description: "" });
  };

  const validateForm = () => {
    const newErrors = { title: "", description: "" };
    let valid = true;

    if (!inputArticle.title.trim()) {
      newErrors.title = "Title is required";
      valid = false;
    }
    if (!inputArticle.description.trim()) {
      newErrors.description = "Description is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleEditArticle = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      await EditArticle(
        inputArticle.title,
        inputArticle.description,
        +props.id
      );
      toast.success("Article updated successfully");
      router.refresh();
      // window.location.reload();
      handleClose();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Network error. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={props.open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{ sx: { borderRadius: 3, p: 1 } }}
    >
      <DialogTitle sx={{ fontWeight: 600 }}>Update Article</DialogTitle>

      <DialogContent>
        <Typography variant="body2" color="text.secondary" mb={2}>
          Enter the new title and description for the article.
        </Typography>

        <Stack spacing={2.5}>
          <TextField
            label="Title"
            value={inputArticle.title}
            onChange={(e) =>
              setInputArticle({ ...inputArticle, title: e.target.value })
            }
            error={Boolean(errors.title)}
            helperText={errors.title}
            fullWidth
            size="small"
          />

          <TextField
            label="Description"
            value={inputArticle.description}
            onChange={(e) =>
              setInputArticle({ ...inputArticle, description: e.target.value })
            }
            error={Boolean(errors.description)}
            helperText={errors.description}
            multiline
            rows={4}
            fullWidth
            size="small"
          />
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={handleClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleEditArticle}
          disabled={loading}
          endIcon={loading ? <CircularProgress size={16} /> : null}
        >
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditArticleDialog;
