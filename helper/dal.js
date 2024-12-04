"use server";

import { cookies } from "next/headers";
import { decrypt } from "./session";
// import { cache } from "react";

export const verifySession = async () => {
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  return session;
};
// export const verifySession = cache(async () => {
//   const cookie = (await cookies()).get("session")?.value;
//   const session = await decrypt(cookie);

//   return session;
// });
