import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      id: "google",
      name: "google",
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    async session(user, account, profile) {
      return { user, account, profile };
    },
  },
};

export const GET = async (req, res) => {
  return NextAuth(req, res, authOptions);
};

export const POST = async (req, res) => {
  return NextAuth(req, res, authOptions);
};
