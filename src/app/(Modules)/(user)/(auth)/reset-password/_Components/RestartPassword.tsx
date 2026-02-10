"use client"
import {useForm} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {Form } from "@/app/_Components/ui/form"
import ValidationInput from "@/app/_Components/Inputs/ValidationInput"
import { Button } from "@/app/_Components/ui/button"
import { ResetPasswordSchema, ResetPasswordType } from "../Validation/Resetpassword"
import { useSearchParams } from "next/navigation"
import { resetPasswordToken } from "@/lib/Actions/verifyResetPasswordToken"
import { toast } from "react-toastify"

const Resetpassword = () => {
    const params=useSearchParams();
    const token =params.get("token")??"nothing here";
    const form =useForm<ResetPasswordType>({
        resolver:zodResolver(ResetPasswordSchema),
        mode:"onChange",
        defaultValues:{
            newPassword:"",
            confirmNewPassword:""
        }
    })

    const handleResetPassword=async(data:ResetPasswordType)=>{
        console.log("I am clicked");
        try {
          const res=await  resetPasswordToken(data,token);
          if(res.type==="error"){
            toast.error(res.message)
          }
          else{
            toast.success(res.message)
          }
            
        } catch (error) {
            console.error(error)
            toast.error("unexpected error")
        }
        finally{
            form.reset();
        }
    }
    
    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight">Reset Password</h1>
                    <p className="text-muted-foreground">Create a new password for your account</p>
                </div>
                
                <div className="bg-card border rounded-xl p-6 shadow-sm">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleResetPassword)} className="space-y-6">
                            <ValidationInput<ResetPasswordType>
                                fieldTitle="New Password"
                                nameInSchema="newPassword"
                                placeholder="Enter new password"
                                type="password"
                            />
                            
                            <ValidationInput<ResetPasswordType>
                                fieldTitle="Confirm New Password"
                                nameInSchema="confirmNewPassword"
                                placeholder="Confirm new password"
                                type="password"
                            />
                            
                            <Button type="submit" className="w-full">Reset Password</Button>
                        </form>
                    </Form>
                </div>
                
                <p className="text-center text-sm text-muted-foreground">
                    Make sure your password is strong and unique
                </p>
            </div>
        </div>
    )
}

export default Resetpassword;