import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import z from "zod";
import { db } from "@/db";
import { members } from "@/db/schema";

export const getUserDefaultOrganizationIdFn = createServerFn()
  .inputValidator(z.object({ userId: z.string() }))
  .handler(async ({ data: { userId } }) => {
    const organizationsData = await db
      .select()
      .from(members)
      .where(eq(members.userId, userId))
      .limit(1);
    return organizationsData?.[0]?.organizationId ?? null;
  });
