import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { decrypt } from "./helper/utils";

const protectedRoutes = ["/admin"];
const publicRoutes = ["/auth"];

export default async function middleware(req) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  let cookie = await cookies();
  cookie = cookie.get("session")?.value;
  const session = await decrypt(cookie);

  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL("/auth", req.nextUrl));
  }

  if (isPublicRoute && session?.userId) {
    return NextResponse.redirect(new URL("/admin", req.nextUrl));
  }

  return NextResponse.next();
}
