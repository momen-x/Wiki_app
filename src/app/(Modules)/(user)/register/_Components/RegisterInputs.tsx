"use client";
import { domain_name } from "@/app/utils/Domain";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/_Components/ui/card";
import { Form } from "@/app/_Components/ui/form";
import ValidationInput from "@/app/_Components/Inputs/ValidationInput";
import { Button } from "@/app/_Components/ui/button";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import RegisterSchema, {
  RegisterSchemaType,
} from "../_Validation/RegisterValidation";

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

  const submit = async () => {
    setLoading(true);

    try {
      const response = await axios.post(
        `${domain_name}/api/users/register`,
        {
          email: form.getValues("email"),
          password: form.getValues("password"),
          username: form.getValues("username"),
          confirmPassword: form.getValues("confirmPassword"),
        }
      );

      if (response.data) {
        toast.success("Login successful!");
        router.replace("/");
        router.refresh();
      }
    } catch (error: any) {
      if (error.response?.status === 401) {
        toast.error("Invalid email or password");
      } else if (error.response?.status >= 500) {
        toast.error("Server error. Please try again later.");
      } else {
        toast.error("Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
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
              <form
                onSubmit={form.handleSubmit(submit)}
                className="space-y-5"
              >
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
                    {/* <div className="flex justify-end">
                      <Link 
                        href="/forgot-password" 
                        className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                      >
                        Forgot password?
                      </Link>
                    </div> */}
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