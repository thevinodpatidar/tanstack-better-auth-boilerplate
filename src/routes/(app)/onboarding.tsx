import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/onboarding")({
  component: RouteComponent,
});

function RouteComponent() {

  const { user } = Route.useRouteContext();
  return <div>Hello {user.name}! Welcome to the onboarding page.</div>;
}
