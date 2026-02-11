"use client"
import { Button } from '@/app/_Components/ui/button';
import { useEditArticleDialog } from '../../Context/EditArticleDialogContext';

const EditBtn = ({article}:{article:{title:string,description:string,id:string|number,userId:number}}) => {

      
       const { openDialog } = useEditArticleDialog();

         const handleEdit = () => {
    if (article) {
      openDialog(article.id, article.title, article.description, article.userId);
    }
  };

  return (
    <div>
  
            <Button
                variant="default"
                color="primary"
                style={{ margin: "0 6px", width: "100px" }}
              onClick={handleEdit}
              >
                Edit
              </Button>
    </div>
  )
}

export default EditBtn