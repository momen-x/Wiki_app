import auth from "@/auth"
import { redirect } from "next/navigation";
import ForgotPasswordComponent from "./_Components/ForgotPassword";

const ForgotPage = async () => {
    const session=await auth();
    if(session){redirect("/")}
  return (
    <div>
        <ForgotPasswordComponent/>
    </div>
  )
}

export default ForgotPage