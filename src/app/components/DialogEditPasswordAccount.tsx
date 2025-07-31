import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { domin_name } from "../utils/DOMIN";
import { toast } from "sonner";

interface PasswordDialogProps {
  id: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const DialogEditPasswordAccount = ({ id, open, setOpen }: PasswordDialogProps) => {
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [errors, setErrors] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleClose = () => {
    setOpen(false);
    setPasswords({
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    });
    setErrors({
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    };

    if (!passwords.oldPassword.trim()) {
      newErrors.oldPassword = "Current password is required";
      valid = false;
    }

    if (!passwords.newPassword.trim()) {
      newErrors.newPassword = "New password is required";
      valid = false;
    } else if (passwords.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 6 characters";
      valid = false;
    }

    if (passwords.newPassword !== passwords.confirmNewPassword) {
      newErrors.confirmNewPassword = "Passwords do not match";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handlePasswordChange = async () => {
    if (!validateForm()) return;

    try {
      const response = await axios.put(
        `${domin_name}/api/users/profile/${id}`,
        {
          oldPassword: passwords.oldPassword,
          password: passwords.newPassword,
        },
       
      );

      toast.success("Password updated successfully");
      handleClose();
    } catch (error: any) {
      if (error.response) {
        const message = error.response.data.message || "Failed to update password";
        if (message.includes("current password")) {
          setErrors(prev => ({ ...prev, oldPassword: message }));
        } else {
          toast.error(message);
        }
      } else {
        toast.error("Network error. Please try again.");
      }
    }
  };

  const handleInputChange = (field: keyof typeof passwords, value: string) => {
    setPasswords(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Update Password</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To change your password, please enter your current password and then your new password.
        </DialogContentText>
        <TextField
          margin="dense"
          id="oldPassword"
          label="Current Password"
          type="password"
          fullWidth
          variant="standard"
          value={passwords.oldPassword}
          onChange={(e) => handleInputChange("oldPassword", e.target.value)}
          error={!!errors.oldPassword}
          helperText={errors.oldPassword}
          required
        />
        <TextField
          margin="dense"
          id="newPassword"
          label="New Password"
          type="password"
          fullWidth
          variant="standard"
          value={passwords.newPassword}
          onChange={(e) => handleInputChange("newPassword", e.target.value)}
          error={!!errors.newPassword}
          helperText={errors.newPassword}
          required
        />
        <TextField
          margin="dense"
          id="confirmNewPassword"
          label="Confirm New Password"
          type="password"
          fullWidth
          variant="standard"
          value={passwords.confirmNewPassword}
          onChange={(e) => handleInputChange("confirmNewPassword", e.target.value)}
          error={!!errors.confirmNewPassword}
          helperText={errors.confirmNewPassword}
          required
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handlePasswordChange}>Save Changes</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogEditPasswordAccount;