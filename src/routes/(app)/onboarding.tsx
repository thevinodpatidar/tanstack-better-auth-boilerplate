import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/onboarding")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/onboarding"!</div>;
}
