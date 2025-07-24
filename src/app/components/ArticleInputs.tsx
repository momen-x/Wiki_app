"use client"
import { Box, Button, TextField, Typography } from "@mui/material"
import { title } from "process"
import {useState} from "react"
const ArticleInputs = () => {
    const [articleInput,setArticaleInput]=useState({title:"",body:""})
  return (
     <Box className="flex flex-col gap-2 ">
        <Typography variant="h4" component={"h3"}>Add New Article</Typography>
        <TextField
          value={articleInput.title}
          id="title"
          label="title"
          variant="outlined"
          maxRows={8}
          onChange={(e) => {
            setArticaleInput({ ...articleInput, title: e.target.value });
          }}
        />
        <TextField
          value={articleInput.body}
          onChange={(e) => {
            setArticaleInput({ ...articleInput, body: e.target.value });
          }}
           id="body"
          label="body"
          multiline
          rows={4}
        //   defaultValue="Default Value"
          variant="outlined"
        />
        <Button variant="contained">Add</Button>
      </Box>
  )
}

export default ArticleInputs