"use client"
import { Button } from '@/app/_Components/ui/button';
import React, { useState } from 'react'
import EditArticleDialog from './EditArticleDialog';

const EditBtn = ({article}:{article:any}) => {
      const [open, setOpen] = useState(false);
  return (
    <div>
          <EditArticleDialog
        id={article.id}
        userId={article.userId}
open={open}
        setOpen={setOpen}
        title={article.title}
        description={article.description}
      />
            <Button
                variant="default"
                color="primary"
                style={{ margin: "0 6px", width: "100px" }}
                onClick={() => {
                  setOpen(true);
                }}
              >
                Edit
              </Button>
    </div>
  )
}

export default EditBtn