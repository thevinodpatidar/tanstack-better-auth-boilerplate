import { createFileRoute } from "@tanstack/react-router";
import { MainLayout } from "@/components/main-layout";

export const Route = createFileRoute(
  "/(app)/organizations/_pathlessLayout/$id/settings"
)({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <MainLayout breadcrumbs={[{ label: "Settings" }]}>
      Hello "/(app)/organizations/$id/settings"!
    </MainLayout>
  );
}
