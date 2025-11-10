import { createFileRoute, redirect } from "@tanstack/react-router";
import { $checkUserOrganizations } from "@/lib/organization/functions";

export const Route = createFileRoute("/(app)/dashboard")({
  component: RouteComponent,
  pendingComponent: DashboardSkeleton,
  loader: async () => {
    const hasUserOrganizations = await $checkUserOrganizations();

    if (!hasUserOrganizations) {
      throw redirect({ to: "/onboarding" });
    }

    return { hasUserOrganizations };
  },
});

function RouteComponent() {
  return <div>Hello "/(app)/dashboard"!</div>;
}

function DashboardSkeleton() {
  return <div>Loading...</div>;
}