import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { routing } from "@/i18n/routing";
import { updateSession } from "@/lib/supabase/middleware";

const intlMiddleware = createMiddleware(routing);

const protectedRoutes = ["/dashboard", "/messages"];

export default async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // 1. Run next-intl middleware first for locale resolution
    const response = intlMiddleware(request);

    // 2. Refresh Supabase session (attach cookies)
    const { user } = await updateSession(request, response);

    // 3. Check if route is protected
    const pathnameWithoutLocale = pathname.replace(/^\/(en|ar)/, "");
    const isProtectedRoute = protectedRoutes.some((route) =>
        pathnameWithoutLocale.startsWith(route)
    );

    if (isProtectedRoute && !user) {
        // Extract locale from path
        const locale = pathname.startsWith("/ar") ? "ar" : "en";
        const loginUrl = new URL(`/${locale}/login`, request.url);
        loginUrl.searchParams.set("redirect", pathname);
        return NextResponse.redirect(loginUrl);
    }

    return response;
}

export const config = {
    matcher: [
        // Match all pathnames except static files and API routes
        "/((?!api|_next|_vercel|.*\\..*).*)",
    ],
};
