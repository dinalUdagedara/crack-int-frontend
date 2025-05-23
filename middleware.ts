import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const isAuthenticated = !!token;
  const requestedPage = request.nextUrl.pathname;

  // public routes (only login and register)
  const publicRoutes = ["/login", "/register"];
  const inviteRoute = ["/accept-invite"];
  const isPublicRoute = publicRoutes.includes(requestedPage);
  const isInviteRoute = inviteRoute.includes(requestedPage);
  // If user is not authenticated and tries to access any non-public route, redirect to login
  if (!isAuthenticated && !isPublicRoute && !isInviteRoute) {
    const redirectUrl = new URL("/login", request.url);
    redirectUrl.searchParams.set("callbackUrl", requestedPage);
    return NextResponse.redirect(redirectUrl);
  }

  // If user is authenticated and tries to access login or register, redirect to home
  if (isAuthenticated && isPublicRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // We don't need special nuqs middleware anymore - the NuqsAdapter is handling it
  return response;
}

// Update matcher to catch ALL routes
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
