import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '@lib/client';

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  database: process.env.DATABASE_URL,
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({
      session,
      token,
      user,
    }: {
      session: any;
      token: any;
      user: any;
    }) {
      session = {
        ...session,
        user: {
          id: user.id,
          ...session.user,
        },
      };
      return session;
    },
  },
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
      // }),
      // CredentialsProvider({
      //   // The name to display on the sign in form (e.g. 'Sign in with...')
      //   id: "credentials",
      //   name: "credentials",
      //   // The credentials is used to generate a suitable form on the sign in page.
      //   // You can specify whatever fields you are expecting to be submitted.
      //   // e.g. domain, username, password, 2FA token, etc.
      //   // You can pass any HTML attribute to the <input> tag through the object.
      //   credentials: {
      //     username: {
      //       label: "Username",
      //       type: "text",
      //       placeholder: "jsmith",
      //     },
      //     password: { label: "Password", type: "password" },
      //   },
      //   authorize: async (credentials: any, req) => {
      //     const user = await fetch(
      //       `${process.env.NEXTAUTH_URL}/api/user/check-credentials`,
      //       {
      //         method: "POST",
      //         headers: {
      //           "Content-Type": "application/x-www-form-urlencoded",
      //           accept: "application/json",
      //         },
      //         body: Object.entries(credentials)
      //           .map((e) => e.join("="))
      //           .join("&"),
      //       },
      //     )
      //       .then((res) => res.json())
      //       .catch((err) => {
      //         return null;
      //       });
      //
      //     if (user) {
      //       return user;
      //     } else {
      //       return null;
      //     }
      //   },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || '',
      clientSecret: process.env.GOOGLE_SECRET || '',
    }),
  ],
};

export default NextAuth(authOptions);
