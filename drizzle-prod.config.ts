import { config } from "dotenv";

import { defineConfig } from "drizzle-kit";
import { env } from "@/env/server";

config({ path: ".env.production.local" });

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./src/db/drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
});
