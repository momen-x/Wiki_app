"use client";

import * as React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  CircularProgress,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import axios from "axios";
import { domin_name } from "../utils/DOMIN";
import { useRouter } from "next/navigation";

interface IProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  text: string;
  setText: (text: string) => void;
  id: number;
  articleId: number;
}

export default function DialogToEditComment({
  open,
  setOpen,
  text,
  setText,
  id,
  articleId,
}: IProps) {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const editComment = async () => {
    if (!text.trim()) return;

    setLoading(true);
    try {
      await axios.put(`${domin_name}/api/comments/${id}`, {
        text: text.trim(),
        articleId,
      });
      router.refresh();
      handleClose();
    } catch (error) {
      console.error("Failed to update comment:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          padding: 2,
          boxShadow: 8,
        },
      }}
    >
      <DialogTitle>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h6" fontWeight={600}>
            Edit Comment
          </Typography>
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </Stack>
      </DialogTitle>

      <DialogContent>
        <TextField
          autoFocus
          fullWidth
          multiline
          rows={4}
          label="Your new comment"
          value={text}
          onChange={(e) => setText(e.target.value)}
          variant="outlined"
          sx={{ mt: 1 }}
        />
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={handleClose} color="inherit">
          Cancel
        </Button>
        <Button
          onClick={editComment}
          disabled={!text.trim() || loading}
          variant="contained"
          color="primary"
          startIcon={loading ? <CircularProgress size={16} /> : <SaveIcon />}
          sx={{ minWidth: 100 }}
        >
          {loading ? "Saving..." : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
