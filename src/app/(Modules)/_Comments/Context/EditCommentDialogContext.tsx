"use client"
import { createContext, ReactNode, useContext, useState } from "react"
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/app/_Components/ui/dialog";
import { Form } from "@/app/_Components/ui/form";
import ValidationInput from "@/app/_Components/Inputs/ValidationInput";
import { Button } from "@/app/_Components/ui/button";
import { UpdateCommentSchema, UpdateCommentSchemaType } from "../Validation/CreateAndEditComment";
import { useEditComment } from "../Hooks/useEditComment";

interface IEditCommentDialog {
    open: boolean;
    setOpen: (open: boolean) => void;
    openDialog: (commentId: number | string, text: string) => void;
}

const EditCommentDialogContext = createContext<IEditCommentDialog | undefined>(undefined);

export const useEditCommentDialog = () => {
    const context = useContext(EditCommentDialogContext);
    if (!context) {
        throw new Error("useEditCommentDialog must be used within EditCommentDialogContextProvider");
    }
    return context;
};

const EditCommentDialogContextProvider = ({ children }: { children: ReactNode }) => {
    const [open, setOpen] = useState(false);
    const [commentId, setCommentId] = useState<number | string>("");
    const [userId, setUserId] = useState<number>();

    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const form = useForm<UpdateCommentSchemaType>({
        mode: "onBlur",
        resolver: zodResolver(UpdateCommentSchema),
        defaultValues: { 
      text:""
        },
    });

    const { mutate: EditComment } = useEditComment(() => {
        toast.success("Comment updated successfully");
        router.refresh();
        window.location.reload();
        handleClose();
        setLoading(false);
    });

    const handleClose = () => {
        setOpen(false);
        form.reset();
        setCommentId("");
        setUserId(0);
        
    };

    const handleOpenChange = (isOpen: boolean) => {
        setOpen(isOpen);
        if (!isOpen) {
            handleClose();
        }
    };

    // Simplified function to open dialog with data
    const openDialog = (id: number | string, text: string) => {
        setCommentId(id);
        setUserId(userId)
        form.reset({
            text:text
          
        });
    
        setOpen(true);
    };

    const handleEditComment = async (data: UpdateCommentSchemaType) => {
        if (!data.text) {
            toast.error("Invalid data");
            return;
        }

        setLoading(true);
        try {
            EditComment({ id: commentId, data });
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Network error. Please try again.");
            setLoading(false);
        }
    };

    const contextValue: IEditCommentDialog = {
        open,
        setOpen,
        openDialog,
    };

    return (
        <EditCommentDialogContext.Provider value={contextValue}>
            {children}
            <Dialog open={open} onOpenChange={handleOpenChange}>
                <DialogContent className="sm:max-w-125">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-semibold">
                            Update Comment
                        </DialogTitle>
                        <DialogDescription className="text-sm text-muted-foreground mt-1">

                    
                            Enter the new text  for the comment
                        
                        </DialogDescription>
                    </DialogHeader>

                    <Form {...form}>
                        <form className="space-y-5" onSubmit={form.handleSubmit(handleEditComment)}>
                            <ValidationInput<UpdateCommentSchemaType>
                                fieldTitle="Comment Text"
                                nameInSchema="text"
                                placeholder="write your comment ..."
                                type="text"
                                className="h-12"
                            />

                        
                          

                            <DialogFooter className="flex items-center gap-2">
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
                                    className="flex-1"
                                >
                                    {loading ? "Saving..." : "Save Changes"}
                                </Button>

                               
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </EditCommentDialogContext.Provider>
    );
};

export default EditCommentDialogContextProvider;