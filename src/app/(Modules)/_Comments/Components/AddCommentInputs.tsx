"use client";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { domain_name } from "@/app/utils/Domain";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CreateCommentSchema, { CreateCommentSchemaType } from "../Validation/CreateAndEditComment";
import { Form } from "@/app/_Components/ui/form";
import ValidationInput from '../../../_Components/Inputs/ValidationInput';
import { Button } from "@/app/_Components/ui/button";
import { Send } from "lucide-react";

interface IId {
  id: string;
}

const AddCommentInputs = ({ id }: IId) => {
  const router = useRouter();
  
  const form = useForm({
    mode: "onBlur",
    resolver: zodResolver(CreateCommentSchema),
    defaultValues: {
      text: '',
      articleId: +id  
    }
  });

  const [isLoading, setIsLoading] = useState(false);
  
  const handleAddComment = async () => {
    setIsLoading(true);

    try {
      if (isNaN(+id)) {
        throw new Error();
      }
      const body = {
        text: form.getValues("text"),
        articleId: +id,
      };

      await axios.post(`${domain_name}/api/comments`, body);
      router.refresh();
      form.reset(); 
    } catch (error) {
      // Handle error if needed
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
        Leave a Comment
      </h3>
      
      <Form {...form}>
        <form 
          className="space-y-4" 
          onSubmit={form.handleSubmit(handleAddComment)}
        >
          <div className="relative">
            <ValidationInput<CreateCommentSchemaType>
              fieldTitle="Add Comment"
              nameInSchema="text"
              placeholder="Write your comment here..."
          
            />
            <div className="absolute bottom-3 right-3 text-sm text-gray-400">
              {form.watch("text")?.length || 0}/500
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isLoading}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 
                text-white rounded-lg transition-colors"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Adding...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Post Comment
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddCommentInputs;