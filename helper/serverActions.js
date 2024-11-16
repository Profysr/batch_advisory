"use server";

import { redirect } from "next/navigation";
import { createSession, deleteSession } from "./utils";

const testUser = {
  id: "1",
  email: "bilal@me",
  password: "12345678",
  role: "admin",
};

export const loginFn = async (prevState, formData) => {
  const { email, password } = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  if (email !== testUser.email || password !== testUser.password) {
    return {
      errors: {
        email: ["Invalid email or password"],
      },
    };
  }

  await createSession(testUser.id);
  redirect("/admin");
};

export async function logoutSession() {
  await deleteSession();
  redirect("/auth");
}
