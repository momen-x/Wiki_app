
"use client"
import { createContext, ReactNode, useContext, useState } from "react"
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateArticleSchema, UpdateArticleSchemaType } from "../_Validation/CreateAndEditArticleSchema";
import { useUpdateArticle } from "../Hooks/useEditArticle";
import { toast } from "react-toastify";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/app/_Components/ui/dialog";
import { Form } from "@/app/_Components/ui/form";
import ValidationInput from "@/app/_Components/Inputs/ValidationInput";
import ValidationTextArea from '@/app/_Components/Inputs/ValidationTextArea';
import { Button } from "@/app/_Components/ui/button";

interface IEditArticleDialog {
    open: boolean;
    setOpen: (open: boolean) => void;
    openDialog: (articleId: number | string, title: string, description: string,userId:number) => void;
}

const EditArticleDialogContext = createContext<IEditArticleDialog | undefined>(undefined);



const EditArticleDialogContextProvider = ({ children }: { children: ReactNode }) => {
    const [open, setOpen] = useState(false);
    const [articleId, setArticleId] = useState<number | string>("");
    const [userId, setUserId] = useState<number>();

    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const form = useForm<UpdateArticleSchemaType>({
        mode: "onBlur",
        resolver: zodResolver(UpdateArticleSchema),
        defaultValues: { 
            title: "", 
            description: "",
        userId:1,
        },
    });

    const { mutate: EditArticle } = useUpdateArticle(() => {
        toast.success("Article updated successfully");
        router.refresh();
        handleClose();
        setLoading(false);
    });

    const handleClose = () => {
        setOpen(false);
        form.reset();
        setArticleId("");
        setUserId(0);
        
    };

    const handleOpenChange = (isOpen: boolean) => {
        setOpen(isOpen);
        if (!isOpen) {
            handleClose();
        }
    };

    // Simplified function to open dialog with data
    const openDialog = (id: number | string, title: string, description: string,userId:number) => {
        setArticleId(id);
        setUserId(userId)
        form.reset({
            title: title,
            description: description,
            userId:userId,
        });
    
        setOpen(true);
    };

    const handleEditArticle = async (data: UpdateArticleSchemaType) => {
        if (!articleId) {
            toast.error("Article ID is missing");
            return;
        }

        setLoading(true);
        try {
            EditArticle({ id: articleId, data });
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Network error. Please try again.");
            setLoading(false);
        }
    };

    const contextValue: IEditArticleDialog = {
        open,
        setOpen,
        openDialog,
    };

    return (
        <EditArticleDialogContext.Provider value={contextValue}>
            {children}
            <Dialog open={open} onOpenChange={handleOpenChange}>
                <DialogContent className="sm:max-w-125">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-semibold">
                            Update Article
                        </DialogTitle>
                        <DialogDescription className="text-sm text-muted-foreground mt-1">

                    
                            Enter the new title and description for the article
                        
                        </DialogDescription>
                    </DialogHeader>

                    <Form {...form}>
                        <form className="space-y-5" onSubmit={form.handleSubmit(handleEditArticle)}>
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
        </EditArticleDialogContext.Provider>
    );
};

export default EditArticleDialogContextProvider;


export const useEditArticleDialog = () => {
    const context = useContext(EditArticleDialogContext);
    if (!context) {
        throw new Error("useEditArticleDialog must be used within EditArticleDialogContextProvider");
    }
    return context;
};