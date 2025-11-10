import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
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

    return true;
  }

  return false;
});
