"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { PencilIcon, Trash } from "lucide-react";
import { useDeleteComment } from "../Hooks/useDeleteComment";
import { toast } from "react-toastify";
import { useEditCommentDialog } from "../Context/EditCommentDialogContext";

interface IComments {
  id: number;
  updatedAt: Date;
  text: string;
  user: { username?: string; name?: string };
  articleId: number;
  userId: number;
}

interface ListOfCommentsProps {
  comments: IComments[];
  userId: number;
}

const ListOfComments = ({ comments, userId }: ListOfCommentsProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
const { mutate: deleteComment } = useDeleteComment(() => {
  router.refresh();
  toast.success("Comment deleted successfully");
});
  const handleDeleteComment = async (id: number) => {
    try {
      const sureConfirm = confirm("Are you sure you want to delete this comment?");
      if (sureConfirm) {
        setLoading(true);
deleteComment({ id });
        
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    } finally {
      setLoading(false);
    }
  };

 const { openDialog: openEditCommentDialog } = useEditCommentDialog();
 const handleEditComment = (id: number, text: string) => {
   openEditCommentDialog(id, text);
 };


  return (
    <div>
      {comments.map((c: IComments) => {
        return (
          <div key={c.id} className="flex justify-between items-center mt-3">
            <div className="bg-gray-300 dark:bg-gray-700 p-4 rounded-lg w-full mr-4">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold mb-1"></h3>

                <div>
                  {userId === c.userId && (
                    <>
                      {loading ? (
                        <span className="text-sm text-gray-500">
                          Deleting...
                        </span>
                      ) : (
                        <div className="flex gap-5">
                          <Trash
                            onClick={() => handleDeleteComment(c.id)}
                            className="text-red-600 cursor-pointer hover:text-red-700 transition-colors"
                            size={20}
                          />
                          <PencilIcon
                            onClick={() => handleEditComment(c.id, c.text)}
                            className="text-green-400 cursor-pointer hover:text-green-500 transition-colors"
                            size={20}
                          />
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
              {c.user.username ? c.user.username : c.user.name}
              <p className="text-gray-500 mb-1.5">{c.text}</p>

              <div className="flex flex-col gap-2"></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ListOfComments;