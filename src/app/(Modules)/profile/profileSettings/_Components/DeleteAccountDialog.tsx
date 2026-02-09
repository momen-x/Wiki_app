"use client"
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import DeleteAccount, { DeleteAccountType } from '../_Validations/CheckPasswordToDeleteAccount';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/app/_Components/ui/dialog";
import ValidationInput from "@/app/_Components/Inputs/ValidationInput";
import { Form } from "@/app/_Components/ui/form";
import { Button } from "@/app/_Components/ui/button";
import { domain_name } from "@/app/utils/Domain";
import { useState } from "react";
import { AlertTriangle } from "lucide-react";
interface IDeleteAccountDialogProps {
  id: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const DeleteAccountDialog = ({
  id,
  open,
  setOpen,
}: IDeleteAccountDialogProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<DeleteAccountType>({
    mode: "onBlur",
    resolver: zodResolver(DeleteAccount),
    defaultValues: {
      password: "",
    },
  });

  const handleClose = () => {
    setOpen(false);
    form.reset();
  };

  const handleDeleteAccount = async (data: DeleteAccountType) => {
    setIsLoading(true);
    try {
      // await axios.delete(
      //   `${domain_name}/api/users/profile/${id}`,
      //   {
      //     headers: {
      //       "X-Password": data.password,
      //     },
      //   },
      // );

      toast.success("Account deleted successfully");
      handleClose();
      router.push("/");
    } catch (error: any) {
      if (error.response) {
        const message = error.response.data.message || "Failed to delete account";
        toast.error(message);
      } else {
        toast.error("Network error. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-red-100 rounded-full">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
          <DialogTitle className="text-center text-xl font-semibold">
            Delete Account
          </DialogTitle>
          <DialogDescription className="text-center text-gray-600">
            This action cannot be undone. All your data will be permanently deleted.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleDeleteAccount)} className="space-y-6">
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-sm text-amber-800">
                To confirm account deletion, please enter your current password.
              </p>
            </div>

            <ValidationInput<DeleteAccountType>
              fieldTitle="Current Password"
              nameInSchema="password"
              placeholder="Enter your password"
              type="password"
            />

            <DialogFooter className="gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={isLoading}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="destructive"
                disabled={isLoading}
                className="flex-1 bg-red-600 hover:bg-red-700"
              >
                {isLoading ? "Deleting..." : "Delete Account"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteAccountDialog;

