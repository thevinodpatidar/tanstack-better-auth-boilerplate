import { IconFlowerFilled } from "@tabler/icons-react";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { CreateOrganizationForm } from "@/components/create-organization-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { checkUserOrganizationsQueryOptions } from "@/lib/organization/queries";

export const Route = createFileRoute("/(app)/onboarding")({
  component: RouteComponent,
  pendingComponent: OnboardingSkeleton,
  loader: async ({ context }) => {
    const userOrganizations = await context.queryClient.ensureQueryData({
      ...checkUserOrganizationsQueryOptions(),
      revalidateIfStale: true,
    });

    if (userOrganizations.hasOrganizations) {
      throw redirect({
        to: "/organizations/$id",
        params: { id: userOrganizations.organizationId },
      });
    }

    return { userOrganizations };
  },
});

function RouteComponent() {
  return (
    <div className="flex h-svh w-screen items-center justify-center">
      <Card className="relative w-full max-w-xs sm:max-w-sm">
        <CardHeader className="border-none bg-transparent shadow-xs">
          <div className="flex flex-col items-center text-center">
            <IconFlowerFilled className="size-10" />
            <div className="flex flex-col">
              <CardTitle className="font-semibold text-xl">
                Create your organization
              </CardTitle>
              <CardDescription className="text-muted-foreground text-sm">
                Create your organization to get started
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <CreateOrganizationForm />
        </CardContent>
      </Card>
    </div>
  );
}

function OnboardingSkeleton() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Card className="relative w-full max-w-xs sm:max-w-sm">
        <CardHeader className="border-none bg-transparent shadow-xs">
          <div className="flex flex-col items-center gap-2 text-center">
            <Skeleton className="size-10" />
            <div className="flex flex-col items-center gap-2">
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="size-12" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
