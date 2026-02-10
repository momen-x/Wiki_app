"use client"
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Form } from "@/app/_Components/ui/form";
import ValidationInput from "@/app/_Components/Inputs/ValidationInput";
import { UpdateArticleSchema, UpdateArticleSchemaType } from '../../_Validation/CreateAndEditArticleSchema';
import ValidationTextArea from '@/app/_Components/Inputs/ValidationTextArea';
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/app/_Components/ui/dialog";
import { Button } from "@/app/_Components/ui/button";
import { useUpdateArticle } from "../../Hooks/useEditArticle";
import { toast } from "react-toastify";

interface IProps {

    id: number | string;
    open: boolean;
    setOpen: (open: boolean) => void;
    description: string;
    title: string;
    userId: number;

}

const EditArticleDialog = ({ id,open, setOpen,description,title,userId }: IProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const form = useForm<UpdateArticleSchemaType>({
    mode: "onBlur",
    resolver: zodResolver(UpdateArticleSchema),
    defaultValues: {
      title: title,
      description: description,
      userId: userId,

    },
  });
  const {mutate: EditArticle}=useUpdateArticle(()=>{
 toast.success("Article updated successfully");
      router.refresh();
      handleClose();
      setLoading(false);
  });

  const handleClose = () => {
  setOpen(false);
  };

  const handleEditArticle = async (data: UpdateArticleSchemaType) => {
    setLoading(true);
    try {
       EditArticle(
        {id,data}
      
      );
     
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Network error. Please try again."
      );
    } 
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-125">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-800">
            Update Article
          </DialogTitle>
          <p className="text-sm text-gray-500 mt-1">
            Enter the new title and description for the article
          </p>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <Form {...form}>
            <form 
              className="space-y-5" 
              onSubmit={form.handleSubmit(handleEditArticle)}
            >
              <ValidationInput<UpdateArticleSchemaType>
                fieldTitle="Article Title"
                nameInSchema="title"
                placeholder="Enter article title"
                type="text"
                className="h-12"
              />
              
              <ValidationTextArea<UpdateArticleSchemaType>
                fieldTitle="Article Description"
                nameInSchema="description"
                placeholder="Enter article description"
                className="min-h-32"
              />
                      <DialogFooter className="flex items-center justify-between gap-2 sm:gap-0">
          <Button
            type="submit"
            disabled={loading}
            className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700"
          >
            {loading ? "Saving..." : "Save Changes"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={loading}
            className="flex-1 sm:flex-none m-2"
          >
            Cancel
          </Button>
        </DialogFooter>
            </form>
          </Form>
        </div>


      </DialogContent>
    </Dialog>
  );
};

export default EditArticleDialog;