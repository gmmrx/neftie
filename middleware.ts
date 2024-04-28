import { withAuth } from "next-auth/middleware";
import type { NextFetchEvent, NextRequest } from "next/server";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req: NextRequest, ev: NextFetchEvent) {},
  {
    callbacks: {
      authorized: async ({ token, req }) => {
        // Example pseudo-code for route-specific logic
        const path = req.nextUrl.pathname; // This is conceptual, not actual `withAuth` API usage.

        // Admin routes
        if (path.startsWith("/admin") && token?.isAdmin) {
          return true;
        }

        // Default to false for all other cases
        return false;
      },
    },
    pages: {
      signIn: "/",
    },
  }
);

export const config = {
  matcher: ["/:path*/admin/:path*"],
};
