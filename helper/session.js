"use server";

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(session) {
  if (!session) {
    console.log("No session provided");
    return null;
  }
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log("Decryption Failed:", error.message);
    return null;
  }
}

// creating and deleting session
export async function createSession(user) {
  const createdAt = new Date(Date.now());
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await encrypt({ ...user, createdAt, expiresAt });
  const cookie = await cookies();

  cookie.set("session", session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    createdAt,
    createdAt,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function deleteSession() {
  const cookie = await cookies();
  cookie.delete("session");
}
