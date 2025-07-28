"use client";
import DeleteIcon from "@mui/icons-material/Delete";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

interface IComments {
  id: number;
  updatedAt: Date;
  text: string;
  user: { username: string };
  userId: number;
}

interface ListOfCommentsProps {
  comments: IComments[];
  userId: boolean;
}

const ListOfComments = ({ comments, userId }: ListOfCommentsProps) => {
  return (
    <div>
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
              {userId ? (
                <>
                  <DeleteIcon className="text-red-600 cursor-pointer" />
                  <EditTwoToneIcon className="text-green-400 cursor-pointer" />
                </>
              ) : (
                <></>
              )}
            </CardActions>
          </Card>
        );
      })}
    </div>
  );
};

export default ListOfComments;
