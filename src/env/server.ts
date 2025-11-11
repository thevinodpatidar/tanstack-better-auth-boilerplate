import { createEnv } from "@t3-oss/env-core";
import { config } from "dotenv";
import { z } from "zod";

config();

export const env = createEnv({
  server: {
    DATABASE_URL: z.string(),
    BETTER_AUTH_URL: z.string().default("http://localhost:3000"),
    BETTER_AUTH_SECRET: z.string().min(1),
    BETTER_AUTH_EMAIL_FROM: z.string(),


    PASSKEY_RP_ID: z.string(),
    RESEND_API_KEY: z.string().min(1),

    GITHUB_CLIENT_ID: z.string(),
    GITHUB_CLIENT_SECRET: z.string(),
    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),
  },

  runtimeEnv: process.env,

  emptyStringAsUndefined: true,
});
