import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Public sayfalar için kontrol yapma
  const publicPaths = [
    "/",
    "/login",
    "/signup",
    "/free-trial",
    "/api/auth/login",
    "/api/auth/signup",
    "/api/subscription/purchase",
    "/api/free-trial/start",
  ];

  if (
    publicPaths.some((path) => pathname === path || pathname.startsWith(path)) ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon.ico")
  ) {
    return NextResponse.next();
  }

  try {
    // Token'ı cookie veya header'dan al
    const token =
      request.cookies.get("authToken")?.value ||
      request.headers.get("authorization")?.replace("Bearer ", "");

    if (!token) {
      // Token yoksa login sayfasına yönlendir
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }

    // JWT_SECRET kontrolü
    if (!JWT_SECRET) {
      console.error("JWT_SECRET is not defined");
      return NextResponse.next();
    }

    // Token'ı doğrula (sadece token geçerliliği kontrol edilir, veritabanı işlemi yapılmaz)
    try {
      jwt.verify(token, JWT_SECRET);
      // Token geçerli, sayfaya erişime izin ver
      // Detaylı abonelik ve ücretsiz deneme kontrolleri client-side'da yapılacak
      return NextResponse.next();
    } catch (error) {
      // Geçersiz token, login sayfasına yönlendir
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  } catch (error) {
    console.error("Middleware error:", error);
    // Hata durumunda login sayfasına yönlendir
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|login|signup|subscription-expired|free-trial).*)",
  ],
};
