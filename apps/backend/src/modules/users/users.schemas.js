import { z } from 'zod/v4';

export const userSchema = z.object({
  id: z.number(),
  email: z.email(),
  name: z.string(),
  passwordHash: z.string(),
});
