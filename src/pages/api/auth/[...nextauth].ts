import { createUser, findUserByEmail, verifyPassword } from "@/lib/auth";
import { SupabaseAdapter } from "@next-auth/supabase-adapter";
import { SessionStrategy } from "next-auth";
import { Adapter } from "next-auth/adapters";
import AppleProvider from "next-auth/providers/apple";
import CredentialsProvider from "next-auth/providers/credentials";
import EmailProvider from "next-auth/providers/email";
import FacebookProvider from "next-auth/providers/facebook";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import LinkedInProvider from "next-auth/providers/linkedin";
import TwitterProvider from "next-auth/providers/twitter";
import NextAuth from "next-auth/next";

export const authOptions = {
  providers: [
    // Google Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    // GitHub Provider
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    // Facebook Provider
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID as string,
      clientSecret: process.env.FACEBOOK_SECRET as string,
    }),
    // Twitter Provider
    TwitterProvider({
      clientId: process.env.TWITTER_ID as string,
      clientSecret: process.env.TWITTER_SECRET as string,
    }),
    // LinkedIn Provider
    LinkedInProvider({
      clientId: process.env.LINKEDIN_ID as string,
      clientSecret: process.env.LINKEDIN_SECRET as string,
      authorization: {
        params: { scope: 'openid profile email' },
      },
      issuer: 'https://www.linkedin.com',
      jwks_endpoint: 'https://www.linkedin.com/oauth/openid/jwks',
      profile(profile, tokens) {
        const defaultImage =
          'https://cdn-icons-png.flaticon.com/512/174/174857.png';
          console.log(profile)
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture ?? defaultImage,
        };
      },
   }),
    // Apple Provider
    AppleProvider({
      clientId: process.env.APPLE_ID as string,
      clientSecret: process.env.APPLE_SECRET as string,
    }),
    // Email Provider
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER,
        port: process.env.EMAIL_SERVER_PORT,
        secure: false,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
        tls: {
          rejectUnauthorized: false,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
    // Credentials Provider
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        isSignUp: { label: "Is Sign Up", type: "isSignUp" }
      },
      async authorize(credentials) {
        if (credentials!.isSignUp == 'true') {
          // Handle account creation
          const existingUser = await findUserByEmail(credentials!.email);
          if (existingUser) {
            console.log('User already exists with this email')
            throw new Error('User already exists with this email');
          }
          console.log(credentials!.email)
          const newUser = await createUser(credentials!.email, credentials!.password);
          console.log('User Account created !')
          console.log(newUser)
          return newUser;
        } else {
          // Handle login
          const user = await findUserByEmail(credentials!.email);
          if (user && await verifyPassword(user, credentials!.password)) {
            console.log('User logged in !')
            console.log(user)
            return user;
          } else {
            console.log('Invalid email or password')
            throw new Error('Invalid email or password');
          }
        }
      }
    }),
  ],
  adapter: SupabaseAdapter({
    url: process.env.SUPABASE_URL as string,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY as string,
  }) as Adapter,
  session: {
    strategy: "jwt" as SessionStrategy,
  },
};

export default NextAuth(authOptions);
