"use client"
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/app/_Components/ui/dialog";
import { Form } from "@/app/_Components/ui/form";
import { useForm } from "react-hook-form";
import { UpdateCommentSchema, UpdateCommentSchemaType } from "@/app/(Modules)/_Comments/Validation/CreateAndEditComment";
import { zodResolver } from "@hookform/resolvers/zod";
import ValidationInput from "@/app/_Components/Inputs/ValidationInput";
import { Button } from "@/app/_Components/ui/button";
import { useEditComment } from "../Hooks/useEditComment";
import { toast } from "react-toastify";

interface IProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  id: number;
  text: string;
}

const EditCommentDialog = ({ open, setOpen, id, text }: IProps) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<UpdateCommentSchemaType>({
    mode: "onBlur",
    resolver: zodResolver(UpdateCommentSchema),
    defaultValues: {
      text: text,
    },
  });
  const { mutate: editComment } = useEditComment(() => {
    toast.success("Comment updated successfully");
    router.refresh();
    handleClose();
  });

  useEffect(() => {
    if (open) {
      form.reset({
        text: text,
      });
    }
  }, [open, text, form]);

  const handleClose = () => {
    setOpen(false);
    form.reset();
  };

  const handleEditComment = async (data: UpdateCommentSchemaType) => {
    setLoading(true);
    try {
      if (id !== 0) {
        //EditComment
        editComment({ id, data });
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Network error. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-800">
            Edit Comment
          </DialogTitle>
          <p className="text-sm text-gray-500 mt-1">
            Update your comment below
          </p>
        </DialogHeader>

        <div className="py-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleEditComment)}
              className="space-y-4"
            >
              <ValidationInput<UpdateCommentSchemaType>
                fieldTitle=""
                nameInSchema="text"
                placeholder="Write your comment here..."
                type="text"
                className="min-w-42"
              />

              <DialogFooter className="gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  disabled={loading}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                >
                  {loading ? "Saving..." : "Save Changes"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditCommentDialog;