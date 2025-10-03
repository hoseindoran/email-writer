import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token }) => {
      return !!token;
    },
  },
  pages: {
    signIn: "/signin",
  },
});

export const config = {
  matcher: ["/", "/email/:path*"],
};
