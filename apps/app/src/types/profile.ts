import { z } from 'zod';

export type MyProfile = {
  firstName: string;
  lastName: string;
  email: string;
};

export const ProfileFormSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email()
});

export type ProfileForm = z.infer<typeof ProfileFormSchema>;
