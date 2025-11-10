import { createFileRoute } from "@tanstack/react-router";
import { MainLayout } from "@/components/main-layout";

export const Route = createFileRoute(
  "/(app)/organizations/_pathlessLayout/$id/dashboard"
)({
  component: RouteComponent,
});

function RouteComponent() {
  return <MainLayout>Hello "/(app)/organizations/$id/dashboard"!</MainLayout>;
}
