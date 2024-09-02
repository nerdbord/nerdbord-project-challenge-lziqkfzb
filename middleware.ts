import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/',
  '/create(.*)',
  '/policy(.*)',
  '/api/del-temp-forms(.*)',
]);

export default clerkMiddleware((auth, req) => {
  if (!isPublicRoute(req) && !auth().userId) {
    // Add custom logic to run before redirecting
    console.log('Nieautyrozowany dostep');

    return auth().redirectToSignIn();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
