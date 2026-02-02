import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { domain_name } from "@/app/utils/Domain";
import { Dialog, DialogContent, DialogTitle } from "@/app/_Components/ui/dialog";
import { Form } from "@/app/_Components/ui/form";
import ValidationInput from "@/app/_Components/Inputs/ValidationInput";
import { useForm } from "react-hook-form";
import { UpdateUserPasswordType, UpdateUserPassword } from "../_Validations/UpdateUserInfoValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/app/_Components/ui/button";

interface PasswordDialogProps {
  id: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const DialogEditPasswordAccount = ({ id, open, setOpen }: PasswordDialogProps) => {
  const form = useForm<UpdateUserPasswordType>({
    mode: "onBlur",
    resolver: zodResolver(UpdateUserPassword),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const [errors, setErrors] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleClose = () => {
    setOpen(false);
    form.reset();
    setErrors({
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    });
  };

  const validateForm = () => {
    const { newPassword, confirmNewPassword } = form.getValues();
    let valid = true;
    const nextErrors = {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    };

    if (!newPassword || newPassword.length < 6) {
      nextErrors.newPassword = "Password must be at least 6 characters";
      valid = false;
    }

    if (newPassword !== confirmNewPassword) {
      nextErrors.confirmNewPassword = "Passwords do not match";
      valid = false;
    }

    setErrors(nextErrors);
    return valid;
  };

  const handlePasswordChange = async (data: UpdateUserPasswordType) => {
    if (!validateForm()) return;

    try {
      // await axios.put(`${domain_name}/api/users/profile/${id}`, {
      //   oldPassword: data.oldPassword,
      //   password: data.newPassword,
      // });
      

      toast.success("Password updated successfully");
      handleClose();
    } catch (error: any) {
      if (error.response) {
        const message = error.response.data.message || "Failed to update password";
        if (message.includes("current password")) {
          setErrors((prev) => ({ ...prev, oldPassword: message }));
        } else {
          toast.error(message);
        }
      } else {
        toast.error("Network error. Please try again.");
      }
    }
  };

  return (
    <Dialog open={open}>
      <DialogTitle>Update Password</DialogTitle>
      <DialogContent>
        To change your password, please enter your current password and then your new password.
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handlePasswordChange)} className="space-y-5">
            <ValidationInput<UpdateUserPasswordType>
              fieldTitle="Enter your old password"
              nameInSchema="oldPassword"
              placeholder="Enter old password"
              type="password"
            />
            <ValidationInput<UpdateUserPasswordType>
              fieldTitle="Enter the new password"
              nameInSchema="newPassword"
              placeholder="Enter the new password"
              type="password"
            />
            <ValidationInput<UpdateUserPasswordType>
              fieldTitle="Confirm the new password"
              nameInSchema="confirmNewPassword"
              placeholder="Confirm the new password"
              type="password"
            />
            <div className="flex gap-2">
              <Button type="submit">Save Changes</Button>
              <Button type="button" onClick={handleClose}>
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default DialogEditPasswordAccount;