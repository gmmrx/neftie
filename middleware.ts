import { withAuth } from "next-auth/middleware";
import type { NextFetchEvent, NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { i18nRouter } from "next-i18n-router";
import i18nConfig from "./i18nConfig";

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  // Handle i18n routing
  const i18nResponse = i18nRouter(req, i18nConfig);
  let finalResponse = i18nResponse instanceof Response ? i18nResponse : null;


  const authResponse = withAuth(
    async function (req: NextRequest, ev: NextFetchEvent) {
    },
    {
      callbacks: {
        authorized: async ({ token, req }) => {
          const path = req.nextUrl.pathname;
          // Only enforce admin check on paths starting with any locale followed by '/admin'
          if (path.match(/\/[a-z]{2}\/admin/) && !token?.isAdmin) {
            return false; // Access denied for non-admins on admin routes
          }
          return true; // Allow all other paths
        },
      },
      pages: {
        signIn: "/login",
        signOut: "/",
        error: "/error",
      },
    }
  )(req, ev);
  const response = await authResponse;

  // Handle response based on authorization
  if (response && !response.ok) {
    console.log("Redirecting to login due to unauthorized access");
    return NextResponse.rewrite(new URL('/', req.url))
  }
  return finalResponse ? finalResponse : NextResponse.next();
}

// Configuration for what paths this middleware should match
export const config = {
  matcher: [
    "/((?!api|static|.*\\..*|_next).*)",
    "/admin/:path*",
    "/:path*/admin/:path*",
  ],
};
