import LoginInput from "@/app/(Modules)/(user)/login/_Components/Login";
import auth from "@/auth";
import { redirect } from "next/navigation";
async function LoginPage() {
  const session = await auth();
  if (session) {
    redirect("/");
  }
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-150px)] ">
      <LoginInput />
    </div>
  );
}
export default LoginPage;
