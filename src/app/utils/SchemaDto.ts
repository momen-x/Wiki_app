import * as z from "zod";

export const IEditArticle = z.object({
  title: z
    .string()
    .min(2, { message: "title should be 2 characters long" }).optional(),
  description: z.string().min(2)
});
export const createArticleSchema = z.object({
  title: z
    .string()
    .min(2, { message: "title should be 2 characters long" }),
  description: z.string().min(3),
  userId:z.number(),
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
    .max(30),
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
    .max(50),
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



export const DeleteAcountDto = z.object({
  password: z.string().min(8).max(50),
});
