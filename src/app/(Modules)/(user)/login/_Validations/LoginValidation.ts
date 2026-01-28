import z from "zod";
import { de } from "zod/v4/locales";

const LoginSchema   = z.object({
    email: z.string().min(1, "Email is required").email("Invalid email address"),
    password: z.string().min(1, "Password is required").min(6, "Password must be at least 6 characters"),
})

export type LoginSchemaType = z.infer<typeof LoginSchema>;

export default LoginSchema;