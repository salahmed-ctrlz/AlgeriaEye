import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { routing } from "@/i18n/routing";
import { updateSession } from "@/lib/supabase/middleware";

const intlMiddleware = createMiddleware(routing);

const protectedRoutes = ["/dashboard", "/messages", "/control-center"];

export default async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // 1. Run next-intl middleware first for locale resolution
    const response = intlMiddleware(request);

    // 2. Refresh Supabase session (attach cookies)
    const { user } = await updateSession(request, response);

    // 3. Check if route is protected
    const pathnameWithoutLocale = pathname.replace(/^\/(en|ar|fr)/, "");
    const isProtectedRoute = protectedRoutes.some((route) =>
        pathnameWithoutLocale.startsWith(route)
    );

    if (isProtectedRoute && !user) {
        // Extract locale from path
        const locale = pathname.startsWith("/ar") ? "ar" : pathname.startsWith("/fr") ? "fr" : "en";
        const loginUrl = new URL(`/${locale}/login`, request.url);
        loginUrl.searchParams.set("redirect", pathname);
        return NextResponse.redirect(loginUrl);
    }

    // 4. Role-based protection for /control-center
    if (pathnameWithoutLocale.startsWith("/control-center")) {
        // We check metadata first (fastest)
        const role = user?.user_metadata?.role;
        if (role !== "admin") {
            const locale = pathname.startsWith("/ar") ? "ar" : pathname.startsWith("/fr") ? "fr" : "en";
            return NextResponse.redirect(new URL(`/${locale}/dashboard`, request.url));
        }
    }

    return response;
}

export const config = {
    matcher: [
        // Match all pathnames except static files and API routes
        "/((?!api|_next|_vercel|.*\\..*).*)",
    ],
};
