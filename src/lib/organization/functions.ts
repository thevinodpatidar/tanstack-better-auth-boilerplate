import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { and, eq } from "drizzle-orm";
import z from "zod/v3";
import { db } from "@/db";
import { members } from "@/db/schema";
import { auth } from "@/lib/auth/auth";

export const $checkUserOrganizations = createServerFn({
  method: "GET",
}).handler(async () => {
  const organizationsData = await auth.api.listOrganizations({
    headers: getRequest().headers,
  });

  if (organizationsData.length) {
    await auth.api.setActiveOrganization({
      headers: getRequest().headers,
      body: {
        organizationId: organizationsData[0].id,
        organizationSlug: organizationsData[0].slug,
      },
    });

    return {
      organizationId: organizationsData[0].id,
      hasOrganizations: true,
    };
  }

  return {
    hasOrganizations: false,
    organizationId: null,
  };
});

export const $checkOrganizationWithId = createServerFn({
  method: "GET",
})
  .inputValidator(z.object({ organizationId: z.string(), userId: z.string() }))
  .handler(async ({ data: { organizationId, userId } }) => {
    const validOrganization = await db.query.members.findFirst({
      where: and(
        eq(members.organizationId, organizationId),
        eq(members.userId, userId)
      ),
    });

    return !!validOrganization;
  });
