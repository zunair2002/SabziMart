import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const Publicroutes = ['/login', '/register', '/', '/api/auth', '/unauthorized'];
  if (Publicroutes.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  if (!token) {
    const loginurl = new URL('/login', req.url);
    loginurl.searchParams.set("callbackurl", req.url);
    return NextResponse.redirect(loginurl);
  }

  const role = token.role;
  if (!pathname.startsWith('/user') && role === 'user') {
    console.log("Unauthorized access by user role at:", req.url);
    return NextResponse.redirect(new URL('/unauthorized', req.url));
  }
  if (!pathname.startsWith('/admin') && role === 'admin') {
    console.log("Unauthorized access by admin role at:", req.url);
    return NextResponse.redirect(new URL('/unauthorized', req.url));
  }
  if (!pathname.startsWith('/rider') && role === 'rider') {
    console.log("Unauthorized access by rider role at:", req.url);
    return NextResponse.redirect(new URL('/unauthorized', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
};