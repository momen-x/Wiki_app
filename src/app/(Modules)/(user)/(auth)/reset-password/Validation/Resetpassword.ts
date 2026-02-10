import z from "zod"

export const ResetPasswordSchema = z.object({
    newPassword: z.string().min(8, { message: "The password must be at least 8 characters" }),
    confirmNewPassword: z.string().min(8, { message: "The password must be at least 8 characters" })
}).refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"] 
});

export type ResetPasswordType=z.infer<typeof ResetPasswordSchema>;