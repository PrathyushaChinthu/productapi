import { z } from 'zod';

export const ProductSchema = z.object({
  id: z.string(),
  title: z.string().min(1, { message: 'Title is required.' }),
  description: z.string().min(1, { message: 'Description is required.' }),
  brand: z.string().optional(),
  brandId: z.string().min(1, { message: 'Brand is required.' }),
  category: z.string().optional(),
  categoryId: z.string().min(1, { message: 'Category is required.' }),
  store: z.string().optional(),
  storeId: z.string().min(1, { message: 'Store is required.' }),
  mrp: z.coerce.number().int().positive().gt(0),
  regularPrice: z.coerce.number().int().positive().gt(0),
  dealPrice: z.coerce.number().int().positive().gt(0),
  code: z.string().min(1, { message: 'CODE is required.' }),
  imageUrl: z.string().min(1, { message: 'Image URL is required.' }),
  expired: z.boolean(),
  active: z.boolean(),
});

export const NewProductSchema = ProductSchema.omit({
  id: true,
  category: true,
  store: true,
});

export const UpdateProductSchema = ProductSchema.omit({
  id: true,
});

export const ScraperSchema = z.object({
  productURL: z.string().url({ message: 'Invalid URL' }),
});

export type IProduct = z.infer<typeof ProductSchema>;
export type INewProduct = z.infer<typeof NewProductSchema>;
