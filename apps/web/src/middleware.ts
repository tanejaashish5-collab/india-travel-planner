import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

// Wrap next-intl middleware to convert 307 → 301 for locale redirects
// Google treats 307 as temporary — indexes both URLs. 301 consolidates.
export default function middleware(request: NextRequest) {
  const response = intlMiddleware(request);

  // Convert temporary redirects (307) to permanent (301) for SEO
  if (response.status === 307) {
    const location = response.headers.get("location");
    if (location) {
      return NextResponse.redirect(new URL(location, request.url), 301);
    }
  }

  return response;
}

export const config = {
  // Match all pathnames except static files and API routes
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
