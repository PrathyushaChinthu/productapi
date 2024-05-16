import { z } from 'zod';

export const BrandSchema = z.object({
  id: z.string(),
  name: z.string().min(3, { message: 'Name is required.' }),
  active: z.boolean(),
});

export const NewBrandSchema = BrandSchema.omit({
  id: true,
});

export type IBrand = z.infer<typeof BrandSchema>;

export type INewBrand = z.infer<typeof NewBrandSchema>;
