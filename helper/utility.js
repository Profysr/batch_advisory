import { users } from "@/data/users";
import { z } from "zod";

export const generateRandomColor = () => {
  // Generate a random color
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgba(${r}, ${g}, ${b}, 0.25)`;
};

export const extractSpecificColumns = (row, cols) => {
  return cols.reduce((result, col) => {
    if (row[col] !== undefined) {
      result[col] = row[col];
    }
    return result;
  }, {});
};

// Function to filter users by role
export const filterUsersByRole = (users, role) => {
  return users.filter((user) => user.role === role);
};

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
