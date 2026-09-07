import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import pool from "@/lib/db";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  events: {
    async signIn({ user, account, profile }:any) {
      // Sirf Google login ke liye
      if (account?.provider !== "google") {
        return;
      }

      const googleId = account.providerAccountId;
      const name = user.name;
      const email = user.email;

      console.log("Google Login Data:");
      console.log("Name:", name);
      console.log("Email:", email);
      console.log("Google ID:", googleId);

      if (!email || !googleId) {
        console.log("Google email ya Google ID nahi mili");
        return;
      }

      // Check karo user database mein already hai ya nahi
      const [existingUser]: any = await pool.query(
        "SELECT id FROM user WHERE email = ?",
        [email]
      );

      if (existingUser.length === 0) {
        // New Google user
        await pool.query(
          `INSERT INTO user 
          (name, email, password, google_id)
          VALUES (?, ?, ?, ?)`,
          [name, email, null, googleId]
        );

        console.log("Google user database mein save ho gaya");
      } else {
        // Existing user → Google ID update
        await pool.query(
          "UPDATE user SET google_id = ? WHERE email = ?",
          [googleId, email]
        );

        console.log("Existing user ka Google ID update ho gaya");
      }
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };