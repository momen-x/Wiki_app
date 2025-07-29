import { Password } from "@mui/icons-material";
import * as z from "zod";

export const IEditArticle = z.object({
  title: z
    .string()
    .min(3, { message: "title should be 3 characters long" })
    .max(50, { message: "the title must be less than 50 characters" })
    .optional(),
  description: z.string().min(10).max(200).optional(),
});
export const createArticleSchema = z.object({
  title: z
    .string()
    .min(3, { message: "title should be 3 characters long" })
    .max(50, { message: "the title must be less than 50 characters" }),
  description: z.string().min(10).max(500),
  userId: z.number(),
});

export const RegisterAcount = z.object({
  username: z
    .string()
    .min(4, "username must to be at lest 4 characters")
    .max(50, "username must to be less than 50 characters"),
  email: z.email("invalid email"),
  password: z
    .string()
    .min(8, "the password must be at lest 8 characters")
    .max(50),
  confirmPassword: z
    .string()
    .min(8, "the password must be at lest 8 characters")
    .max(50),
});
export const LoginDto = z.object({
  email: z.email("invalid email"),
  password: z
    .string()
    .min(8, "the password must be at lest 8 characters")
    .max(50, "hi here"),
});

export const EditUserData = z.object({
  email: z.email().optional(),
  password: z
    .string()
    .min(8, "the password must be at lest 8 characters")
    .max(50)
    .optional(),
  username: z
    .string()
    .min(4, "the username must be at lest 4 characters")
    .max(30)
    .optional(),
});

export const CreateCommentDto = z.object({
  text: z.string().min(1),
  articleId: z.number(),
});

export const EditCommentDto = z.object({
  text: z.string().min(1),
});
