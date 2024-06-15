import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth";
import discord from "next-auth/providers/discord";
import { db } from "./db";
import { accounts, sessions, users, verificationTokens } from "./db/schema";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [discord],
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
});
