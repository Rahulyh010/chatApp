import { z } from "zod";

export const userValidtor = z.object({
  body: z.object({
    name: z.string().nullable().default(null),
    about: z.string().nullable().default(null),
    userName: z.string().nullable().default(null),
    avatar: z.string().nullable().default(null),
    phoneNo: z.string().length(10),
    phoneNoVerfied: z.boolean().default(false),
    password: z.string().min(8),
    email: z.string().email().nullable().default(null),
    emailVerfied: z.boolean().default(false),
    loggedDevices: z
      .array(z.object({ deviceName: z.string(), loggedStatus: z.boolean() }))
      .nullable()
      .default(null),
    country: z.enum(["IN"]).optional(),
    settings: z.string().length(24).nullable().default(null),
    chats: z.array(z.string().length(24)).nullable().default(null),
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
