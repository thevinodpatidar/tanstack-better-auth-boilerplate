import { createFileRoute, notFound } from "@tanstack/react-router";
import { DefaultNotFound } from "@/components/default-not-found";
import { checkOrganizationWithIdQueryOptions } from "@/lib/organization/queries";

export const Route = createFileRoute("/(app)/organizations/$id")({
  component: RouteComponent,
  loader: async ({ params, context }) => {
    // check if the slug is already in the database
    const validOrganization = await context.queryClient.ensureQueryData({
      ...checkOrganizationWithIdQueryOptions(params.id, context.user.id),
      revalidateIfStale: true,
    });

    if (!validOrganization) {
      throw notFound();
    }

    return { id: params.id };
  },
  notFoundComponent: () => <DefaultNotFound />,
});

function RouteComponent() {
  const { id } = Route.useParams();
  return <div>Hello "/(app)/organizations/" {id}!</div>;
}
