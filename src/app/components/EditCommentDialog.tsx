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
import { editComment } from "../utils/editComment";
import { useRouter } from "next/navigation";

interface IProps {
  props: {
    id: number | string;
    open: boolean;
    setOpen: (open: boolean) => void;
  };
}

const EditCommentDialog = ({ props }: IProps) => {
  const [inputComment, setInputComment] = useState("");
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleClose = () => {
    props.setOpen(false);
    setInputComment("");
    setErrors("");
  };

  const validateForm = () => {
    let newErrors = "";
    let valid = true;

    if (!inputComment.trim()) {
      newErrors = "Title is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleEditArticle = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      let b = await editComment(+props.id, inputComment);
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
            label="text"
            value={inputComment}
            onChange={(e) => setInputComment(e.target.value)}
            error={Boolean(errors)}
            helperText={errors}
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

export default EditCommentDialog;
