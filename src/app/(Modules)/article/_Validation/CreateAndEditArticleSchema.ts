import z from "zod";
import { de } from "zod/v4/locales";
const CreateArticleSchema = z.object({
    title: z.string().min(5, "Title must be at least 5 characters long").max(100, "Title must be at most 100 characters long"),
    description: z.string().min(20, "Description must be at least 20 characters long").max(5000, "Description must be at most 5000 characters long"),
    userId: z.number().int().positive("User ID must be a positive integer"),
});
export type CreateArticleSchemaType = z.infer<typeof CreateArticleSchema>;

const UpdateArticleSchema = CreateArticleSchema;
export type UpdateArticleSchemaType = z.infer<typeof UpdateArticleSchema>;
export default CreateArticleSchema;
export { UpdateArticleSchema };

    