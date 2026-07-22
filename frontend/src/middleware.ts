import { NextResponse, type NextRequest } from "next/server";
import { routes } from "@/lib/routes";

const AUTH_COOKIE = "access_token";

const protectedPrefixes = [
  routes.dashboard,
  routes.certifications,
  routes.flashcards,
  routes.mockExams,
  routes.analytics,
  "/study",
];

const authRoutes: string[] = [routes.login, routes.register];

function isProtectedPath(pathname: string) {
  return protectedPrefixes.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(AUTH_COOKIE)?.value;

  if (pathname === "/") {
    return NextResponse.redirect(
      new URL(token ? routes.dashboard : routes.login, request.url),
    );
  }

  if (isProtectedPath(pathname) && !token) {
    return NextResponse.redirect(new URL(routes.login, request.url));
  }

  if (authRoutes.includes(pathname) && token) {
    return NextResponse.redirect(new URL(routes.dashboard, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard/:path*", "/certifications/:path*", "/flashcards/:path*", "/mock-exams/:path*", "/analytics/:path*", "/study/:path*", "/login", "/register"],
};
