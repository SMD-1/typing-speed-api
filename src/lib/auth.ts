import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db";
import { account, session, user, verification } from "../db/schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: { user, account, session, verification },
  }),
  trustedOrigins: ["http://localhost:5173", "https://typiingspeed.netlify.app"],
  advanced: {
    crossSubDomainCookies: {
      enabled: true,
      domain: process.env.COOKIE_DOMAIN || undefined, // Domain with a leading period
    },
    defaultCookieAttributes: {
      secure: true,
      // httpOnly: true,
      sameSite: "none", // Allows CORS-based cookie sharing across subdomains
      // partitioned: true, // New browser standards will mandate this for foreign cookies
    },
  },
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
});
