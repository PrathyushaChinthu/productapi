import { z } from 'zod';

export const SubcategorySchema = z.object({
  id: z.string(),
  name: z.string().min(3, { message: 'Name must be at least 3 characters.' }),
  active: z.boolean(),
  categoryId: z.string(),
  category: z.string(),
});

export const NewSubcategorySchema = SubcategorySchema.omit({
  id: true,
  active: true,
});

export type ISubcategory = z.infer<typeof SubcategorySchema>;

export type INewSubcategory = z.infer<typeof NewSubcategorySchema>;
