"use client";
import DeleteIcon from "@mui/icons-material/Delete";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
interface ICommentDeatail {
  name: string;
  comment: string;
  delIcon: React.ReactNode;
  editIcon: React.ReactNode;
  date?: Date;
}
const comments: ICommentDeatail[] = [
  {
    name: "hasan",
    comment: "this is the body",
    delIcon: <DeleteIcon sx={{color:'red', ":hover":{cursor:'pointer'}}}/>,
    editIcon: <EditTwoToneIcon sx={{color:"green",":hover":{cursor:'pointer'}}}/>,
  },
  {
    name: "hasan",
    comment: "this is the body",
    delIcon: <DeleteIcon sx={{color:'red',":hover":{cursor:'pointer'}}}/>,
    editIcon: <EditTwoToneIcon sx={{color:"green",":hover":{cursor:'pointer'}}}/>,
  },
  {
    name: "hasan",
    comment: "this is the body",
    delIcon: <DeleteIcon sx={{color:'red',":hover":{cursor:'pointer'}}}/>,
    editIcon: <EditTwoToneIcon sx={{color:"green",":hover":{cursor:'pointer'}}}/>,
  },
  {
    name: "hasan",
    comment: "this is the body",
    delIcon: <DeleteIcon sx={{color:'red',":hover":{cursor:'pointer'}}}/>,
    editIcon: <EditTwoToneIcon sx={{color:"green",":hover":{cursor:'pointer'}}}/>,
  },
  
];
const ListOfComments = () => {
  return <div>{
    comments.map((c,index)=>{
        return ( <Card sx={{ minWidth: 275 }} key={index} className="flex justify-between items-center mt-3">
      <CardContent>
        <Typography component={'h3'} gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
        {c.name}
        </Typography>
       
        <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>{c.comment}</Typography>
        
      </CardContent>
      <CardActions>
{c.delIcon}
{c.editIcon }
      </CardActions>
    </Card>)
    })
    }
    
    </div>;
};

export default ListOfComments;
