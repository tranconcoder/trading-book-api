import { z } from "zod";

/**
 * Creates a Zod validation schema for synchronizing user data from Google.
 * Enforces email domain matching and non-empty profile fields.
 * @param studentEmailSuffix - The allowed email domain suffix (e.g., 'student.vlute.edu.vn').
 * @returns A Zod schema object.
 */
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

/**
 * Type inferred from the sync user validation schema.
 */
export type SyncUserZodDto = z.infer<ReturnType<typeof createSyncUserSchema>>;
