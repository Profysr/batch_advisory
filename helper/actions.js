"use server";

import { redirect } from "next/navigation";
import { createSession, deleteSession } from "./session";
// import { findUserByEmail } from "./utility";

export const simplifiedUsers = () => {
  const db = JSON.parse(localStorage.getItem("dbData") || {});
  const users = [
    ...db.students.map((student) => ({
      ...student,
      role: "student",
    })),
    ...db.advisors.map((advisor) => ({
      ...advisor,
      role: "advisor",
    })),
    ...db.admins.map((admin) => ({
      ...admin,
      role: "admin",
    })),
  ];

  // return users.map((user) => ({
  //   id: user.id,
  //   email: user.email,
  //   password: user.password,
  //   role: user.role,
  // }));
  return users;
};

export const loginFn = async (formData) => {
  const { email, password } = formData;

  const users = simplifiedUsers(); // Access the users array
  const user = users.find((user) => user.email === email);

  if (!user || user.password !== password) {
    return { errors: { email: ["Invalid email or password"] } };
  }

  await createSession(user.id, user.role);
  redirect("/");
};

// export const loginFn = async (prevState, formData) => {
//   const validatedFields = LoginFormSchema.safeParse({
//     email: formData.get("email"),
//     password: formData.get("password"),
//   });

//   if (!validatedFields.success) {
//     return {
//       errors: validatedFields.error.flatten().fieldErrors,
//     };
//   }

//   // getting users

//   // logic
//   const { email, password } = validatedFields.data;
//   const user = findUserByEmail(email);

//   if (!user || user.password !== password) {
//     return {
//       errors: {
//         email: ["Invalid email or password"],
//       },
//     };
//   }

//   await createSession(user.id, user.role);
//   redirect("/");
// };

export async function logoutSession() {
  await deleteSession();
  redirect("/auth");
}
