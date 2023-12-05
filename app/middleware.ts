import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/home",
  },
});

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|home|examples/*|signup|login).*)',
  ],
};
