import z from "zod"

const UpdateUserSchema = z.object({
    username: z.string().min(1, "Name is required").optional(),
    // email: z.string().min(1, "Email is required").email("Invalid email address").optional(),
})

export const UpdateUserPassword = z.object({
    oldPassword: z.string().min(1, "Password is required"),
    newPassword: z.string().min(8, "Password is required and must be at least 8 characters long"),
    confirmNewPassword: z.string().min(8, "Confirm new password is required"),

})

export type UpdateUserSchemaType = z.infer<typeof UpdateUserSchema>;
export type UpdateUserPasswordType = z.infer<typeof UpdateUserPassword>;
export default UpdateUserSchema;