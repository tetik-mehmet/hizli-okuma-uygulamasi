import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { checkSubscriptionAccess } from "@/lib/checkSubscriptionAccess";

const JWT_SECRET = process.env.JWT_SECRET;

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Public sayfalar için kontrol yapma
  const publicPaths = [
    "/",
    "/login",
    "/signup",
    "/free-trial",
    "/subscription-expired",
    "/api/auth/login",
    "/api/auth/signup",
    "/api/subscription/purchase",
    "/api/free-trial/start",
    "/api/cron",
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

    // Token'ı doğrula
    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (error) {
      // Geçersiz token, login sayfasına yönlendir
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }

    // /genel altındaki sayfalar için server-side abonelik kontrolü
    if (pathname.startsWith("/genel")) {
      const accessCheck = await checkSubscriptionAccess(decoded.userId, pathname);
      if (!accessCheck.hasAccess) {
        const url = request.nextUrl.clone();
        url.pathname = "/subscription-expired";
        return NextResponse.redirect(url);
      }
    }

    // Token geçerli ve erişim kontrolü başarılı
    return NextResponse.next();
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
