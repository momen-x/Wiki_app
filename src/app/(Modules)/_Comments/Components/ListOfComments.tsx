"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { domain_name } from "@/app/utils/Domain";
import EditCommentDialog from "@/app/(Modules)/_Comments/Components/EditCommentDialog";
import { PencilIcon, Trash } from "lucide-react";

interface IComments {
  id: number;
  updatedAt: Date;
  text: string;
  user: { username: string };
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
  const [open, setOpen] = useState(false);
  const [selectedComment, setSelectedComment] = useState({
    id: 0,
    text: "",
    articleId: 0,
  });

  const handleDeleteComment = async (id: number) => {
    try {
      const sureConfirm = confirm("Are you sure you want to delete this comment?");
      if (sureConfirm) {
        setLoading(true);
        await axios.delete(`${domain_name}/api/comments/${id}`);
        router.refresh();
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditComment = (id: number, articleId: number, text: string) => {
    setSelectedComment({ id, text, articleId });
    setOpen(true);
  };

  return (
    <div>
      <EditCommentDialog
        id={selectedComment.id}
        open={open}
        setOpen={setOpen}
        text={selectedComment.text}
      />
      {comments.map((c: IComments) => {
        return (
          <div
            key={c.id}
            className="flex justify-between items-center mt-3"
          >
            <div className="bg-gray-300 dark:bg-gray-700 p-4 rounded-lg w-full mr-4">
              <h3 className="font-semibold mb-1">{c.user.username}</h3>
              <p className="text-gray-500 mb-1.5">{c.text}</p>
            </div>
            <div className="flex flex-col gap-2">
              {userId === c.userId && (
                <>
                  {loading ? (
                    <span className="text-sm text-gray-500">Deleting...</span>
                  ) : (
                    <>
                      <Trash
                        onClick={() => handleDeleteComment(c.id)}
                        className="text-red-600 cursor-pointer hover:text-red-700 transition-colors"
                        size={20}
                      />
                      <PencilIcon
                        onClick={() => handleEditComment(c.id, c.articleId, c.text)}
                        className="text-green-400 cursor-pointer hover:text-green-500 transition-colors"
                        size={20}
                      />
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ListOfComments;