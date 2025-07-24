import React from 'react'
import Drawar from '../components/Drawar'
import { Box, Card } from '@mui/material'
import ArticleInputs from '../components/ArticleInputs'

const Admainpage = () => {
  return (
    <div className=''>

      <Drawar>
 <Box
      sx={{ minWidth: 275 }}
      className="flex justify-center items-center min-h-[calc(100vh-150px)] "
    >
      <Card
      className='bg-indigo-400'
        variant="outlined"
        sx={{
          width: "100%",
          maxWidth: 800,
          height:400,
          maxHeight:'100%',
          p: 4,
        }}
      >
        <ArticleInputs/>
        </Card></Box>
      </Drawar>

    
    </div>
  )
}

export default Admainpage