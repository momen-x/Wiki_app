"use client"
import { useRouter } from "next/navigation";
import { useDeleteArticle } from "../../Hooks/useDeleteArticle";
import { Button } from "@/app/_Components/ui/button";




const DeleteBtn = ({id}:{id:number|string}) => {
    const router=useRouter();
    const {mutate:deleteArticle}=useDeleteArticle(()=>{
        router.push("/article?pageNumber=1");

    });    
      const handleDeleteArticle = async () => {
    if (confirm("are u sure u want delete this article")) {
      try {
      deleteArticle(id);

        router.push("/article?pageNumber=1");
      } catch (error) {
        return;
      }
    }
  };
  return (
    <div>
                 <Button
                variant="destructive"
                color="error"
                style={{ margin: "0 6px", width: "100px" }}
                onClick={handleDeleteArticle}
              >
                Delete
              </Button>
    </div>
  )
}

export default DeleteBtn