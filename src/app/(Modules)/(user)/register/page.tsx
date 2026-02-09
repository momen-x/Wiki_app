import RegisterInputs from "@/app/(Modules)/(user)/register/_Components/RegisterInputs";
import auth from "@/auth";
import { redirect } from "next/navigation";

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
