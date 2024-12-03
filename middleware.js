import { cookies } from "next/headers";
import { decrypt } from "./helper/session";
import { NextResponse } from "next/server";

export default async function middleware(req) {
  const path = req.nextUrl.pathname;
  const publicRoutes = ["/auth"];

  if (publicRoutes.includes(path)) {
    return NextResponse.next();
  }

  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  if (!session) {
    return NextResponse.redirect(new URL("/auth", req.nextUrl));
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
