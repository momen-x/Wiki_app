import auth from "@/auth";
import Resetpassword from "./_Components/RestartPassword"
import { redirect } from "next/navigation";

const ResetpasswordPage =async () => {
const session=await auth();
if(session)redirect("/")
  return (
    <div>
        <Resetpassword/>
    </div>
  )
}

export default ResetpasswordPage