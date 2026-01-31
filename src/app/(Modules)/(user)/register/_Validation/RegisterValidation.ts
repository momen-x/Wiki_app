import z from "zod";

const RegisterSchema   = z.object({
    username: z.string().min(1, "Name is required"),
    email: z.string().min(1, "Email is required").email("Invalid email address"),
    password: z.string().min(1, "Password is required").min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Confirm password is required").min(6, "Confirm password must be at least 6 characters"),
})

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;

export default RegisterSchema;