import { z } from "zod";

export const createSyncUserSchema = (studentEmailSuffix: string) =>
  z.object({
    email: z
      .string()
      .email()
      .endsWith(`@${studentEmailSuffix}`, { message: "INVALID_DOMAIN" }),
    firstName: z.string().min(1, "INCOMPLETE_INFO"),
    lastName: z.string().min(1, "INCOMPLETE_INFO"),
    avatar: z.string().url().or(z.string().min(1)).catch("INCOMPLETE_INFO"),
  });

export type SyncUserZodDto = z.infer<ReturnType<typeof createSyncUserSchema>>;
