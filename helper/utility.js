import { users } from "@/data/users";
import { z } from "zod";

// Simulate fetching user from a database
export const findUserByEmail = (email) =>
  users.find((user) => user.email === email);

// Login Form Schema
export const LoginFormSchema = z.object({
  email: z.string().email({ message: "Invalid Email and Password" }).trim(),
  password: z
    .string()
    .min(8, { message: "Be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    .regex(/[0-9]/, { message: "Contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Contain at least one special character.",
    })
    .trim(),
});
