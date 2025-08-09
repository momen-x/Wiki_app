"use client"
import axios from "axios";
import { useState } from "react";
import { domin_name } from "../utils/DOMIN";
import { toast } from "sonner";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useRouter } from "next/navigation";

interface IDeleteAcountDialogProps {
  id: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}
const DeleteAcountDialog = ({
  id,
  open,
  setOpen,
}: IDeleteAcountDialogProps) => {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");

  const handleClose = () => {
    setOpen(false);
    setPassword("");
    setErrors("");
  };

  const validateForm = () => {
    let valid = true;
    let newErrors = password;

    if (!password.trim()) {
      newErrors = "Current password is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

const handlDeleteAcount = async () => {
  if (!validateForm()) return;

  try {
    const response = await axios.delete(
      `${domin_name}/api/users/profile/${id}`,
      {
        headers: {
          'X-Password': password
        }
      }
    );

    toast.success("Account deleted successfully");
    handleClose();
    // Redirect to home or login page after deletion
    // window.location.href = '/';
    router.push("/");

    
  } catch (error: any) {
    if (error.response) {
      const message = error.response.data.message || "Failed to delete account";
      if (message.toLowerCase().includes("password")) {
        setErrors(message);
      } else {
        toast.error(message);
      }
    } else {
      toast.error("Network error. Please try again.");
    }
  }
};

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Delete acount</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To Delete your acount, please enter your current password
        </DialogContentText>
        <TextField
          margin="dense"
          id="oldPassword"
          label="Current Password"
          type="password"
          fullWidth
          variant="standard"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!errors}
          helperText={errors}
          required
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handlDeleteAcount}>delete</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteAcountDialog;
