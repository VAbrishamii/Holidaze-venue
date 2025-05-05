import { z } from "zod";
/**
 * * Zod schema for form validation
 * - Email must end with @stud.noroff.no
 * - Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character
 */

export const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z
    .string()
    .email("Invalid email")
    .regex(/@stud\.noroff\.no$/, "Email must end with @stud.noroff.no"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  role: z.enum(["customer", "manager"]),
  venueManager: z.boolean(),
});
