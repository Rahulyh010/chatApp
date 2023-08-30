import { z } from "zod";

export const userValidtor = z.object({
  body: z.object({
    email: z.string().email(),
  }),
});

export type TUserValidator = z.infer<typeof userValidtor>;

export const userSignInValidtor = z.object({
  body: z.object({
    phoneNo: z.string().min(8).optional(),
    email: z.string().email().optional(),
    password: z.string().min(8),
  }),
});

export type TUserSignInValidator = z.infer<typeof userSignInValidtor>;
