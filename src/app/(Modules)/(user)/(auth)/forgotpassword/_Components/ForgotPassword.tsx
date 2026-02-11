"use client"
import { useForm } from "react-hook-form"
import ValidationInput from "@/app/_Components/Inputs/ValidationInput"
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from "@/app/_Components/ui/form";
import { Button } from "@/app/_Components/ui/button";
import Link from "next/link";
import ForgotPassword, { ForgotPasswordType } from "../validations/forgotPassword";
import { toast } from "react-toastify";
import forgotPassword from "../Action/ForgotPassword";

const ForgotPasswordComponent = () => {
    const form = useForm<ForgotPasswordType>({
        resolver: zodResolver(ForgotPassword),
        mode: "onBlur",
        defaultValues: { email: "" }
    })

    const handleSubmitForgot = async (data:ForgotPasswordType) => {
        try {
            
const res=await forgotPassword(data)
if(res.type!=="success"){
    toast.error(res.message)
}
else{
    toast.success(res.message)
}

        } catch (error) {
            console.error("the error is : ",error);
            toast.error("unexpected error")
            
        }
        finally{
            form.reset();
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center ">
            <div className=" rounded-2xl shadow-xl p-8 w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold mb-2">Reset Password</h1>
                    <p className="text-gray-600 dark:text-gray-200">Enter your email to receive a reset link</p>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmitForgot)} className="space-y-6">
                        <ValidationInput<ForgotPasswordType>
                            fieldTitle="Email Address"
                            nameInSchema="email"
                            placeholder="Enter your email"
                            type="email"
                        />
                        
                        <Button 
                            type="submit" 
                            className="w-full bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                        >
                            Send Reset Link
                        </Button>
                    </form>
                </Form>

                <div className="mt-6 text-center">
                    <Link
                        href="/login" 
                        className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
                    >
                        ← Back to Login
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ForgotPasswordComponent