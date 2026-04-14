/**
 * Next.js Middleware for Route Protection
 * 
 * Implements authentication and authorization checks for protected routes.
 * Validates user access levels and redirects/blocks unauthorized requests.
 * 
 * **Validates: Requirements 2.1, 2.2, 2.3, 2.4, 2.5, 2.6**
 */

import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { AccessLevel } from '@/types/auth';

/**
 * Middleware function with authentication and authorization logic
 * 
 * Protects routes based on user access level:
 * - Redirects restricted users to /access-denied
 * - Blocks non-editors from PUT/POST requests to /api/rules
 * - Ensures authenticated access to protected routes
 */
export default withAuth(
  function middleware(req: NextRequest & { nextauth: { token: any } }) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;
    const method = req.method;

    // Extract access level from token
    const accessLevel = token?.accessLevel as AccessLevel | undefined;

    // Requirement 2.4, 2.6: Redirect restricted users to access-denied page
    if (path.startsWith('/dashboard')) {
      if (
        accessLevel === AccessLevel.RESTRICTED ||
        accessLevel === AccessLevel.NO_ACCESS ||
        !accessLevel
      ) {
        return NextResponse.redirect(new URL('/access-denied', req.url));
      }
    }

    // Requirement 2.1, 2.2, 2.3: Block PUT/POST requests to /api/rules for non-editors
    if (path.startsWith('/api/rules') && (method === 'PUT' || method === 'POST')) {
      if (accessLevel !== AccessLevel.RULE_EDITOR) {
        return NextResponse.json(
          { error: 'Forbidden: Only Rule Editors can modify rules' },
          { status: 403 }
        );
      }
    }

    // Requirement 2.1: Validate Twitch Moderator access to Twitch API content
    if (path.startsWith('/api/rules/twitch') || path.startsWith('/api/warnings/twitch')) {
      if (
        accessLevel !== AccessLevel.TWITCH_MODERATOR &&
        accessLevel !== AccessLevel.RULE_EDITOR
      ) {
        return NextResponse.json(
          { error: 'Forbidden: Insufficient permissions for Twitch content' },
          { status: 403 }
        );
      }
    }

    // Requirement 2.2: Validate Discord Moderator access to Discord API content
    if (path.startsWith('/api/rules/discord') || path.startsWith('/api/warnings/discord')) {
      if (
        accessLevel !== AccessLevel.DISCORD_MODERATOR &&
        accessLevel !== AccessLevel.RULE_EDITOR
      ) {
        return NextResponse.json(
          { error: 'Forbidden: Insufficient permissions for Discord content' },
          { status: 403 }
        );
      }
    }

    // Allow request to proceed
    return NextResponse.next();
  },
  {
    callbacks: {
      /**
       * Authorization callback
       * 
       * Determines if the user is authorized to access the route.
       * Returns true if user has a valid token (is authenticated).
       * 
       * Requirement 2.5: Validates user authentication status
       */
      authorized: ({ token }) => !!token,
    },
  }
);

/**
 * Middleware configuration
 * 
 * Specifies which routes should be protected by this middleware.
 * Matches:
 * - /dashboard and all sub-routes
 * - /api/rules and all sub-routes
 * - /api/warnings and all sub-routes
 */
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/api/rules/:path*',
    '/api/warnings/:path*',
  ],
};
