import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

// Define the route patterns that require authentication
const isProtectedRoute = createRouteMatcher(['/admin(.*)'])

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    // Await the auth hook correctly for Clerk in Next.js 15+ App Router
    const authObject = await auth();
    
    // First protect the route (forces sign in if unauthenticated)
    if (!authObject.userId) {
      return authObject.redirectToSignIn();
    }

    // We enforce the 'admin' role directly within the /admin server component 
    // by using the currentUser() function so we don't have to configure custom session tokens in the dashboard
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
