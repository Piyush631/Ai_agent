import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Sign in with credentials",

      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        try {
          // Check if user exists in database
          let user = await prisma.user.findUnique({
            where: { username: credentials.username }
          });

          // If user doesn't exist, create a default user for demo purposes
          if (!user) {
            user = await prisma.user.create({
              data: {
                username: credentials.username,
                email: `${credentials.username}@example.com`,
                password: credentials.password, // In production, hash this
              }
            });
          }

          if (user) {
            return {
              id: user.userId.toString(),
              name: user.username,
              email: user.email,
            };
          }
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }

        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
