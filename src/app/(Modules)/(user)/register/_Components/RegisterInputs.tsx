"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ValidationInput from "@/app/_Components/Inputs/ValidationInput";
import RegisterSchema, {
  RegisterSchemaType,
} from "../_Validation/RegisterValidation";
import { signIn } from "next-auth/react";
//
import Link from "next/link";
import { toast } from "react-toastify";
import { Form } from "@/app/_Components/ui/form";
import { useRegister } from "../Hooks/useRegister";
import { Loader2 } from "lucide-react";
import { Button } from "@/app/_Components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/_Components/ui/card";
const LoginInput = () => {
  const form = useForm<RegisterSchemaType>({
    mode: "onBlur",
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      username: "",
    },
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { mutate: registerUser } = useRegister(
    () => {
      toast.success("Registration successful");
      router.replace("/login");
      // window.location.reload();
      setLoading(false);
    },
    (error:any) => {
      if (error.response?.status === 401) {
        toast.error("Invalid email or password");
      } else if (error.response?.status >= 500) {
        toast.error("Server error. Please try again later.");
      } else {
        toast.error("Registration failed.");
      }
      setLoading(false);
    },
  );

  const submit = (data: RegisterSchemaType) => {
    setLoading(true);
    registerUser(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center  p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-xl border-gray-200">
          <CardHeader className="text-center space-y-1">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12  rounded-lg flex items-center justify-center">
                <span className=" font-bold text-xl">Register</span>
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">
              Welcome in our community
            </CardTitle>
            <CardDescription>
              Enter your credentials to =create your account
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(submit)} className="space-y-5">
                <div className="space-y-4">
                  <ValidationInput<RegisterSchemaType>
                    fieldTitle="Username"
                    nameInSchema="username"
                    placeholder="Enter your username"
                    type="text"
                    className="h-12"
                  />
                  <ValidationInput<RegisterSchemaType>
                    fieldTitle="Email Address"
                    nameInSchema="email"
                    placeholder="Enter your email"
                    type="email"
                    className="h-12"
                  />

                  <ValidationInput<RegisterSchemaType>
                    fieldTitle="Password"
                    nameInSchema="password"
                    placeholder="Enter your password"
                    type="password"
                    className="h-12"
                  />
                  <ValidationInput<RegisterSchemaType>
                    fieldTitle="Confirm Password"
                    nameInSchema="confirmPassword"
                    placeholder="Confirm your password"
                    type="password"
                    className="h-12"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full h-12 border-gray-300 bg-white text-gray-700 hover:bg-gray-50 font-medium flex items-center justify-center gap-2"
                    onClick={()=>{signIn("google")}}

                 >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    Continue with Google
                  </Button>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Registering...
                    </>
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm text-gray-600">
              you have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-blue-600 hover:text-blue-800 hover:underline transition-colors"
              >
                login to your account
              </Link>
            </div>
            <div></div>

            {/* <p className="text-xs text-center text-gray-400">
              By continuing, you agree to our{" "}
              <Link href="/terms" className="hover:underline">Terms</Link>{" "}
              and{" "}
              <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
            </p> */}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default LoginInput;
