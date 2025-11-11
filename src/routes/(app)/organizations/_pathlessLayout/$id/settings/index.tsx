import { createFileRoute } from "@tanstack/react-router";
import { MainLayout } from "@/components/main-layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getFullOrganizationQueryOptions } from "@/lib/organization/queries";
import { UpdateOrganizationName } from "./-components/update-organization-name";
import { UpdateOrganizationSlug } from "./-components/update-organization-slug";

export const Route = createFileRoute(
  "/(app)/organizations/_pathlessLayout/$id/settings/"
)({
  component: RouteComponent,
  loader: async ({ params, context }) => {
    const data = await context.queryClient.ensureQueryData({
      ...getFullOrganizationQueryOptions(params.id),
      revalidateIfStale: true,
    });
    return data;
  },
});

function RouteComponent() {
  const organization = Route.useLoaderData();

  if (!organization) {
    return <div>Organization not found</div>;
  }

  return (
    <MainLayout breadcrumbs={[{ label: "Settings" }]}>
      <div className="space-y-4">
        <div className="flex flex-col">
          <h2 className="font-bold text-2xl">Organization Settings</h2>
          <p className="text-muted-foreground text-sm">
            Manage your organization settings here.
          </p>
        </div>
        <UpdateOrganizationName name={organization.name} />

        <UpdateOrganizationSlug slug={organization.slug} />

        <Card>
          <CardHeader>
            <CardTitle>Danger Zone</CardTitle>
            <CardDescription>
              Irreversible and destructive actions
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col justify-between gap-4 space-y-4">
            {/* <AlertDestructive>
            <p className="text-sm">
              Deleting your organization will permanently remove all associated
              data, including workspaces, forms, and responses. This action
              cannot be undone.
            </p>
          </AlertDestructive> */}
            <p className="text-destructive text-sm">
              Deleting your organization will permanently remove all associated
              data, including workspaces, forms, and responses. This action
              cannot be undone.
            </p>
            <Button className="w-fit self-end" size="sm" variant="destructive">
              Delete Organization
            </Button>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
