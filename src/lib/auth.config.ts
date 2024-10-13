/* eslint-disable @typescript-eslint/no-explicit-any */
export const authConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [],
  callbacks: {
    // FOR MORE DETAIL ABOUT CALLBACK FUNCTIONS CHECK https://next-auth.js.org/configuration/callbacks

    async jwt({ token, user } : any) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token } : any) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
      }
      return session;
    },
    authorized({ auth, request } : any) {
      const user = auth?.user;
      const isOnLoginPage = request.nextUrl?.pathname.startsWith("/login");
      const isOnSalePage = request.nextUrl?.pathname.startsWith("/sale");
      const isOnchatsPage = request.nextUrl?.pathname.startsWith("/chats");
      const isOnBookDetailsPage = request.nextUrl?.pathname.startsWith("/book");

      if(isOnSalePage && !user){
        return false;
      }

      if(isOnchatsPage && !user){
        return false;
      }

      if(isOnBookDetailsPage && !user){
        return false;
      }

      if (isOnLoginPage && user) {
        return Response.redirect(new URL("/", request.nextUrl));
      }

      return true
    },
  },
};