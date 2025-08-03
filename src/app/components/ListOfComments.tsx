"use client";
import DeleteIcon from "@mui/icons-material/Delete";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { domin_name } from "../utils/DOMIN";

import { useRouter } from "next/navigation";
import { useState, useContext } from "react";
import DialogToEditComment from "./DialogToEditComment";
import EditCommentDialog from "./EditCommentDialog";

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
interface IParams {
  params: { id: string };
}

const ListOfComments = ({ comments, userId }: ListOfCommentsProps) => {
  const router = useRouter();
  const [loding, setLoding] = useState(false);
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [id, setId] = useState(0);
  const [articleId, setArticleId] = useState(0);
  const handleDeleteComment = async (id: number) => {
    try {
      const sureConfirm = confirm("are u sure u want delete this comment ");
      if (sureConfirm) {
        await axios.delete(`${domin_name}/api/comments/${id}`);
        setLoding(true);
        router.refresh();
      }
    } catch (error) {
      return;
    } finally {
      setLoding(false);
    }
  };

  const handleEditComment = (
    id: number,
    articleId: number,
    commentText: string
  ) => {
    setText(commentText);
    setId(id);
    setArticleId(articleId);
    setOpen(true);
  };

  return (
    <div>
      <EditCommentDialog props={{ open, setOpen, id }} />
      {comments.map((c: IComments, index) => {
        return (
          <Card
            sx={{ minWidth: 275 }}
            key={index}
            className="flex justify-between items-center mt-3"
          >
            <CardContent>
              <Typography
                component={"h3"}
                gutterBottom
                sx={{ color: "text.secondary", fontSize: 14 }}
              >
                {c.user.username}
              </Typography>

              <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                {c.text}
              </Typography>
            </CardContent>
            <CardActions>
              {userId === c.userId ? (
                <>

                  {loding ? (
                    "...deleted"
                  ) : (
                    <DeleteIcon
                      onClick={() => {
                        handleDeleteComment(c.id);
                      }}
                      className="text-red-600 cursor-pointer"
                    />
                  )}
                  <EditTwoToneIcon
                    onClick={() => handleEditComment(c.id, c.articleId, c.text)}
                    className="text-green-400 cursor-pointer"
                  />
                </>
              ) : (
                <></>
              )}
            </CardActions>
          </Card>
        );
      })}
      <DialogToEditComment
        open={open}
        setOpen={setOpen}
        text={text}
        setText={setText}
        id={id}
        articleId={articleId}
      />
    </div>
  );
};

export default ListOfComments;
