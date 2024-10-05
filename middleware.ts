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
    async function (req: NextRequest, ev: NextFetchEvent) {},
    {
      callbacks: {
        authorized: async ({ token, req }) => {
          const path = req.nextUrl.pathname;

          const adminPathRegex = /^\/(?:[a-z]{2}\/)?admin/;
          if (adminPathRegex.test(path) && (!token || !token.isAdmin)) {
            return false;
          }
          return true;
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

  if (response && !response.ok) {
    console.log("Redirecting to login due to unauthorized access");
    return NextResponse.rewrite(new URL("/", req.url));
  }
  return finalResponse ? finalResponse : NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images|skill-videos).*)"],
};
