import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const mongoUrl = process.env.BETTER_MONGODB_URL;

if (!mongoUrl) {
  throw new Error("BETTER_MONGODB_URL is not configured");
}

const client = new MongoClient(mongoUrl);

const db = client.db("Bangla_news_24");

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },

  // Allow local development and Vercel deployment
  trustedOrigins: [
    "http://localhost:3000",
    "https://news-24-project-kepl-i0k7ulcn5-evan-8cba.vercel.app",
  ],

  socialProviders: {
    google: {
      clientId: process.env.BETTER_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.BETTER_GOOGLE_CLIENT_SECRET as string,
    },

    github: {
      clientId: process.env.BETTER_GITHUB_CLIENT_ID as string,
      clientSecret: process.env.BETTER_GITHUB_CLIENT_SECRET as string,
    },
  },

  database: mongodbAdapter(db, {
    client,
  }),
});