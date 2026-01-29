import z from "zod"

 const CreateCommentSchema = z.object({
  text: z.string().min(2).max(1000),
  articleId: z.number().int().positive(),
});

export type CreateCommentSchemaType = z.infer<typeof CreateCommentSchema>;
export const UpdateCommentSchema = z.object({
  text: z.string().min(2).max(1000),
});
export type UpdateCommentSchemaType = z.infer<typeof UpdateCommentSchema>;

export default CreateCommentSchema;


