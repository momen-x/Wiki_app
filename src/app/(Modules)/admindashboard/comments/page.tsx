
import auth from "@/auth";

import { redirect } from "next/navigation";
import TableOfComments from './_Components/TableOfComments';




export default  async function AdminCommentPage() {
  //verification

const session=await auth();
if(!session||!session.user.isAdmin){
  redirect("/")
}


  return (
 <>
 <TableOfComments id={+session.user.id}/>
 </>
  );
}
