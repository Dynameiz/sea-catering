import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig, User } from "next-auth";
import { prisma } from "./prisma";
import { compare } from "bcrypt";
import NextAuth from "next-auth";

const authConfig = {
  providers: [
    Credentials({
      name: "Login",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { username, password } = credentials as {
          username: string;
          password: string;
        };

        const user = await prisma.user.findUnique({
          where: { username },
        });

        if (!user) return null;

        const isValid = await compare(password, user.password);
        if (!isValid) return null;

        return {
          id: user.id.toString(),
          username: user.username,
          fullName: user.fullName,
          phoneNumber: user.phoneNumber,
          role: user.role,
        } as User;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
  async jwt({ token, user }) {
    if (user) {
      token.id = user.id;
      token.username = user.username;
      token.fullName = user.fullName;
      token.phoneNumber = user.phoneNumber;
      token.role = user.role;
      token.createdAt = user.createdAt;
    }
    return token;
  },
  async session({ session, token }) {
    if (token && session.user) {
      session.user.id = token.id;
      session.user.username = token.username;
      session.user.fullName = token.fullName;
      session.user.phoneNumber = token.phoneNumber;
      session.user.role = token.role;
      session.user.createdAt = token.createdAt;
    }
    return session;
  },
},
  secret: process.env.AUTH_SECRET,
} satisfies NextAuthConfig;

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig);
