import auth from "@/auth";
import { redirect } from "next/navigation";
import RegisterInputs from "@/app/(Modules)/(user)/(auth)/register/_Components/RegisterInputs"

const RegisterPage = async () => {
  const session = await auth();
  if (session) {
    redirect("/");
  }
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-150px)] ">
      <RegisterInputs />
    </div>
  );
};

export default RegisterPage;
