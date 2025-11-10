import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { and, eq } from "drizzle-orm";
import z from "zod/v3";
import { db } from "@/db";
import { members, sessions } from "@/db/schema";
import { auth } from "@/lib/auth/auth";
import { authMiddleware } from "../auth/middleware";

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
      organizationSlug: organizationsData[0].slug,
      hasOrganizations: true,
    };
  }

  return {
    hasOrganizations: false,
    organizationId: null,
    organizationSlug: null,
  };
});

export const $checkOrganizationWithId = createServerFn({
  method: "GET",
})
  .middleware([authMiddleware])
  .inputValidator(z.object({ organizationId: z.string() }))
  .handler(async ({ data: { organizationId }, context: { session } }) => {
    const validOrganization = await db.query.members.findFirst({
      where: and(
        eq(members.organizationId, organizationId),
        eq(members.userId, session.userId)
      ),
    });

    return !!validOrganization;
  });

export const $listOrganizationsWithMemberCount = createServerFn({
  method: "GET",
})
  .middleware([authMiddleware])
  .handler(async ({ context: { session } }) => {
    const organizations = await auth.api.listOrganizations({
      query: { userId: session.userId, member: true },
      headers: getRequest().headers,
    });

    const memberCounts = await Promise.all(
      organizations.map(async (org) => {
        const result = await auth.api.listMembers({
          query: { organizationId: org.id },
          headers: getRequest().headers,
        });
        return { orgId: org.id, count: result.total || 0 };
      })
    );

    const memberCountMap = new Map(
      memberCounts.map((item) => [item.orgId, item.count])
    );

    return { organizations, memberCountMap };
  });

export const $setActiveOrganization = createServerFn({
  method: "POST",
})
  .middleware([authMiddleware])
  .inputValidator(
    z.object({ organizationId: z.string(), organizationSlug: z.string() })
  )
  .handler(
    async ({
      data: { organizationId, organizationSlug },
      context: { session },
    }) => {
      await auth.api.setActiveOrganization({
        body: { organizationId, organizationSlug },
        headers: getRequest().headers,
      });

      await db
        .update(sessions)
        .set({ activeOrganizationId: organizationId })
        .where(eq(sessions.id, session.id));
    }
  );
