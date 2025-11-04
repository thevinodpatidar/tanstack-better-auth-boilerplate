import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: ".env.production.local" });

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./src/db/drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
