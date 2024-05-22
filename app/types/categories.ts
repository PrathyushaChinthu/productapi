import { z } from 'zod';

export const CategoriesSchema = z.object({
  id: z.string(),
  name: z.string().min(3, { message: 'Name is required.' }),
  active: z.boolean(),
});

export const NewCategoriesSchema = CategoriesSchema.omit({
  id: true,
});

export type ICategory = z.infer<typeof CategoriesSchema>;
export type INewCategory = z.infer<typeof NewCategoriesSchema>;
