"use client";
import { useRouter } from "next/navigation";
import { Button } from "../../../_Components/ui/button";
import { useEditArticleDialog } from "../../article/Context/EditArticleDialogContext";
import { useEditCommentDialog } from "../../_Comments/Context/EditCommentDialogContext";
import { useDeleteArticle } from "../../article/Hooks/useDeleteArticle";
import { useDeleteComment } from "../../_Comments/Hooks/useDeleteComment";
import { toast } from "react-toastify";

interface DeleteAndEditButtonProps {
  id: number;
  userId: number;
  commentId?: number;
  articleId?: number;
  title?: string;
  description?: string;
  commentText?: string;
}
const DeleteAndEditButton = ({
  id,
  userId,
  commentId,
  articleId,
  title,
  description,
  commentText,
}: DeleteAndEditButtonProps) => {
  const router = useRouter();
  const { openDialog } = useEditArticleDialog();
  const { openDialog: openEditCommentDialog } = useEditCommentDialog();
  const { mutate: deleteArticle } = useDeleteArticle(() => {
    toast.success("the Article deleted successfully");
    router.refresh();
  });
  const { mutate: deleteComment } = useDeleteComment(() => {
    toast.success("The comment delete successfully");
    router.refresh();
  });

  const handleDelete = async () => {
    if (commentId) {
      if (confirm("Are you sure you want to delete this comment?")) {
        deleteComment({ id: commentId });
      }

      return;
    } else if (articleId) {
      const confirmDeleting = confirm(
        "are you sure you want do delete this article",
      );
      if (confirmDeleting) deleteArticle(articleId);
    }
  };

  const handleEdit = () => {
    if (articleId && title && description) {
      openDialog(articleId, title, description, userId);
    } else if (commentId) {
      openEditCommentDialog(commentId, commentText || "");
    }
  };
  return (
    <>
      {id === userId && (
        <Button
          variant="default"
          onClick={handleEdit}
          className="cursor-pointer"
        >
          Edit
        </Button>
      )}
      <Button
        variant="destructive"
        onClick={handleDelete}
        style={{ marginLeft: "8px" }}
        className="cursor-pointer"
      >
        Delete
      </Button>
    </>
  );
};

export default DeleteAndEditButton;
