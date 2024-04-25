import { authOptions } from "@/lib/authOptions";
import { models } from "@/lib/db";
import NextAuth from "next-auth/next";
import DiscordProvider from "next-auth/providers/discord";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
