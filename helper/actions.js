"use server";

import { redirect } from "next/navigation";
import { createSession, deleteSession } from "./session";
import { findUserByEmail, LoginFormSchema } from "./utility";

export const loginFn = async (prevState, formData) => {
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // extracting email and password
  const { email, password } = validatedFields.data;
  const user = findUserByEmail(email);

  // check if user is not available or password is wrong
  if (!user || user.password !== password) {
    return {
      errors: {
        email: ["Invalid email or password"],
      },
    };
  }

  await createSession(user.id, user.role);
  redirect("/");
};

export async function logoutSession() {
  await deleteSession();
  redirect("/auth");
}
