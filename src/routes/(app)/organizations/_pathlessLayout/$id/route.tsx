import { createFileRoute, notFound, Outlet } from "@tanstack/react-router";
import { DefaultNotFound } from "@/components/default-not-found";
import { checkOrganizationWithIdQueryOptions } from "@/lib/organization/queries";

export const Route = createFileRoute(
  "/(app)/organizations/_pathlessLayout/$id"
)({
  component: () => <Outlet />,
  pendingComponent: () => <div>Loading...</div>,
  loader: async ({ params, context }) => {
    // check if the slug is already in the database
    const validOrganization = await context.queryClient.ensureQueryData({
      ...checkOrganizationWithIdQueryOptions(params.id),
      revalidateIfStale: true,
    });

    if (!validOrganization) {
      throw notFound();
    }

    return { id: params.id };
  },
  notFoundComponent: () => <DefaultNotFound />,
});
