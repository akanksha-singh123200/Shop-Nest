// lib/authOptions.ts

import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  events: {
    async signIn({ user, account, profile }: any) {
      // Yahan apna existing signIn event code rakho
    },
  },
};