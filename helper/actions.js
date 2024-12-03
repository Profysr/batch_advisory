"use server";

import { redirect } from "next/navigation";
import { createSession, deleteSession } from "./session";
import fs from "fs/promises";
import path from "path";

export const loginFn = async (prevState, formData) => {
  const userData = {
    email: formData.get("email").trim(),
    password: formData.get("password").trim(),
  };

  const dbPath = path.join(process.cwd(), "db.json");

  const data = JSON.parse(await fs.readFile(dbPath, "utf-8"));

  const users = [
    ...data.students.map((student) => ({ ...student, role: "student" })),
    ...data.advisors.map((advisor) => ({ ...advisor, role: "advisor" })),
    ...data.admins.map((admin) => ({ ...admin, role: "admin" })),
  ];

  const user = users.find((user) => user.email === userData.email);

  if (!user || user.password !== userData.password) {
    return { errors: { email: ["Invalid email or password"] } };
  }

  await createSession(user);
  redirect("/");
};

export async function logoutSession() {
  await deleteSession();
  redirect("/auth");
}
