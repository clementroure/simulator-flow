import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { createClient } from "@supabase/supabase-js";
import { SupabaseAdapter } from "@next-auth/supabase-adapter";

const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE_KEY as string
);

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET as string,
  adapter: SupabaseAdapter({
    url: process.env.SUPABASE_URL as string,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY as string,
  }),
  callbacks: {
    async signIn({ user, account, profile, email, credentials }: any) {
      return true;
    },
    async redirect({ url, baseUrl }: any) {
      return baseUrl;
    },
    async session({ session, token, user }: any) {
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }: any) {
      return token;
    },
  },
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error', // Error code passed in query string as ?error=
    verifyRequest: '/auth/verify-request', // (used for check email message)
    // newUser: '/path-to-new-user-page' // new user redirected here
  },  
  events: {
    signIn({ user, account, profile, isNewUser }: any) {
      if (isNewUser) {
        console.log("Welcome new user:", user);
      } else {
        console.log("Welcome back:", user);
      }
    },
    signOut({ token, session }: any) {
      console.log("Logout");
    },
    updateUser({ user }: any) {
      console.log("User updated:", user);
    },
  },
};

export default NextAuth(authOptions);
