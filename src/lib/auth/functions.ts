import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { eq } from "drizzle-orm";
import z from "zod";
import { db } from "@/db";
import { members } from "@/db/schema";
import { auth } from "@/lib/auth/auth";

export const $getUser = createServerFn({ method: "GET" }).handler(async () => {
  const session = await auth.api.getSession({ headers: getRequest().headers });

  return session?.user || null;
});

export const $getUserDefaultOrganizationId = createServerFn({
  method: "GET",
})
  .inputValidator(z.object({ userId: z.string() }))
  .handler(async ({ data: { userId } }) => {
    const organizationsData = await db
      .select()
      .from(members)
      .where(eq(members.userId, userId))
      .limit(1);
    return organizationsData?.[0]?.organizationId ?? null;
  });