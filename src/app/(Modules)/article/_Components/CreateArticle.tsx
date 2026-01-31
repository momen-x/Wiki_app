"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import CreateArticleSchema, { CreateArticleSchemaType } from "../_Validation/CreateAndEditArticleSchema";
import { toast } from "react-toastify";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Form } from "@/app/_Components/ui/form";
import ValidationInput from "@/app/_Components/Inputs/ValidationInput";
import ValidationTextArea from "@/app/_Components/Inputs/ValidationTextArea";
import { Button } from "@/app/_Components/ui/button";
import { PlusCircle } from "lucide-react";
import { useCreateArticle } from "../Hooks/useArticle";

const CreateArticle = ({ id }: { id: string | number }) => {
  const form = useForm<CreateArticleSchemaType>({
    mode: "onBlur",
    resolver: zodResolver(CreateArticleSchema),
    defaultValues: {
      title: "",
      description: "",
      userId: Number(id),
    },
  });

  const [isAddingArticle, setIsAddingArticle] = useState(false);
  const router = useRouter();

  // Move onSuccess here to ensure proper closure
  const { mutate: createArticle } = useCreateArticle(() => {
    toast.success("Article added successfully!");
    router.refresh();
    form.reset({
      title: "",
      description: "",
      userId: Number(id),
    });
    setIsAddingArticle(false);
  });

  const handleAddArticle = async (data: CreateArticleSchemaType) => {
    setIsAddingArticle(true);
    createArticle(data);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <PlusCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Create New Article
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Share your knowledge with the community
            </p>
          </div>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleAddArticle)}
            className="space-y-5 w-full"
          >
            <div className="max-w-4xl mx-auto p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">Add New Article</h3>

              <div className="space-y-4">
                <div>
                  <ValidationInput<CreateArticleSchemaType>
                    fieldTitle="Article Title"
                    nameInSchema="title"
                    placeholder="Enter article title"
                    type="text"
                    className="h-12 w-full"
                  />
                </div>

                <div>
                  <ValidationTextArea<CreateArticleSchemaType>
                    fieldTitle="Article Description"
                    nameInSchema="description"
                    placeholder="Enter article description"
                    className="min-h-30 w-full"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isAddingArticle}
                  className="px-6 py-2 bg-blue-600 text-white cursor-pointer font-medium rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isAddingArticle ? (
                    <>
                      <span className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                      Adding...
                    </>
                  ) : (
                    "Add Article"
                  )}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateArticle;