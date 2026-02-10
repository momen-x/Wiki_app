import z from "zod"

const ForgotPassword=z.object({
    email:z.string().min(1,{message:"is required"}).email("Enter a correct email address")
})

export type ForgotPasswordType= z.infer<typeof ForgotPassword>;
export default ForgotPassword;