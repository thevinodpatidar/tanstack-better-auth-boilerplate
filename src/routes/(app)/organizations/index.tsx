import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { SignOutButton } from "@/components/signout-button";
import { Button } from "@/components/ui/button";
import { listOrganizationsWithMemberCountQueryOptions } from "@/lib/organization/queries";
import { OrganizationCard } from "./-components/organization-card";

export const Route = createFileRoute("/(app)/organizations/")({
  component: RouteComponent,
  loader: async ({ context }) => {
    const data = await context.queryClient.ensureQueryData({
      ...listOrganizationsWithMemberCountQueryOptions(context.user.id),
      revalidateIfStale: true,
    });
    return data;
  },
});

function RouteComponent() {
  const data = Route.useLoaderData();
  const { organizations, memberCountMap } = data;

  return (
    <div className="mx-auto flex h-svh max-w-3xl flex-col gap-6 px-4 py-12">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="font-bold text-2xl tracking-tight">
            Your Organizations
          </h1>
          <p className="text-md text-muted-foreground">
            Select an organization to access its dashboard
          </p>
        </div>
        <div className="flex gap-2">
          <Link to="/organizations/create">
            <Button size="sm">
              <Plus />
              Create Organization
            </Button>
          </Link>
          <SignOutButton />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {organizations.map((organization) => (
          <OrganizationCard
            key={organization.id}
            memberCount={memberCountMap.get(organization.id) || 0}
            organization={organization}
          />
        ))}
      </div>
    </div>
  );
}
