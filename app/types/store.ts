import { z } from 'zod';

export const StoreSchema = z.object({
  id: z.string(),
  name: z.string().min(3, { message: 'Name is required.' }),
  active: z.boolean(),
});

export const NewStoreSchema = StoreSchema.omit({
  id: true,
});

export type IStore = z.infer<typeof StoreSchema>;

export type INewStore = z.infer<typeof NewStoreSchema>;
