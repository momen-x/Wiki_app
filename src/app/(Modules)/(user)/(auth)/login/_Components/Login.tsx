"use client";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import LoginSchema, { LoginSchemaType } from "../_Validations/LoginValidation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/_Components/ui/card";
import { Form } from "@/app/_Components/ui/form";
import ValidationInput from "@/app/_Components/Inputs/ValidationInput";
import { Button } from "@/app/_Components/ui/button";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { useLogin } from "../_Hooks/useLogin";
import { signIn } from "next-auth/react";

const LoginInput = () => {
  const form = useForm<LoginSchemaType>({
    mode: "onBlur",
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate: LoginUser, isPending } = useLogin();
  const searchParams = useSearchParams();
  const registered = searchParams.get("registered");

  const submit = async (data: LoginSchemaType) => {
    // Form is already validated by react-hook-form at this point
    LoginUser(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {registered === "true" && (
          <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg text-center">
            <p className="font-bold">Registration Successful!</p>
            <p className="text-sm">
              Please check your inbox to verify your email before logging in.
            </p>
          </div>
        )}

        <Card className="shadow-xl border-gray-200">
          <CardHeader className="text-center space-y-1">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center">
                <span className="font-bold text-xl">Login</span>
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(submit)} className="space-y-5">
                <div className="space-y-4">
                  <ValidationInput<LoginSchemaType>
                    fieldTitle="Email Address"
                    nameInSchema="email"
                    placeholder="Enter your email"
                    type="email"
                    className="h-12"
                  />

                  <div className="space-y-1">
                    <ValidationInput<LoginSchemaType>
                      fieldTitle="Password"
                      nameInSchema="password"
                      placeholder="Enter your password"
                      type="password"
                      className="h-12"
                    />
                  </div>
                  <div> 
                    <p className="text-shadow-white dark:text-gray-500 text-xs">Do you forgot your password  <Link href={"/forgotpassword"}>
                    <strong className="text-gray-400 dark:text-gray-700">Enter here </strong>
                    </Link>
                    </p>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    className="w-full h-12 border-gray-300 bg-white text-gray-700 hover:bg-gray-50 font-medium flex items-center justify-center gap-2"
                    onClick={() => {
                      signIn("google");
                    }}
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
                  disabled={isPending}
                >
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Logging in...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="font-medium text-blue-600 hover:text-blue-800 hover:underline transition-colors"
              >
                Create account
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default LoginInput;
