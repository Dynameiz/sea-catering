import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { prisma } from "@/lib/prisma"; // Update path to match your `prisma.ts`
import { compare } from "bcrypt";

const authConfig = {
  providers: [
    Credentials({
      name: "Phone login",
      credentials: {
        phoneNumber: { label: "Phone Number", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { phoneNumber, password } = credentials as {
          phoneNumber: string;
          password: string;
        };

        const user = await prisma.user.findUnique({
          where: { phoneNumber },
        });

        if (!user) return null;

        const isValid = await compare(password, user.hashedPassword);
        if (!isValid) return null;

        return {
          id: user.id.toString(),
          name: user.name,
          phoneNumber: user.phoneNumber,
        };
      },
    }),
  ],
} satisfies NextAuthConfig;

export default authConfig;
