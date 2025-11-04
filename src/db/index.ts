import { createServerOnlyFn } from "@tanstack/react-start";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { env } from "@/env/server";
// biome-ignore lint/performance/noNamespaceImport: we need to use a namespace import to avoid tree shaking
import * as schema from "./schema";

// Disable prefetch as it is not supported for "Transaction" pool mode
const client = postgres(env.DATABASE_URL, {
  prepare: false,
  max: 10,
  idle_timeout: 30_000,
});

const getDatabase = createServerOnlyFn(() => drizzle({ client, schema }));

export const db = getDatabase();
