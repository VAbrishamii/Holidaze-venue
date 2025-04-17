import { z } from "zod";
/**
 * Zod schema for login validation
 * - Email must end with @stud.noroff.no
 * - Password must be at least 8 characters long
 */
export const loginSchema = z.object({
  email: z
    .string()
    .email("Invalid email")
    .regex(/@stud\.noroff\.no$/, "Email must end with @stud.noroff.no"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});