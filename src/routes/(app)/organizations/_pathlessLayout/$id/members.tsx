import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/(app)/organizations/_pathlessLayout/$id/members"
)({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/(app)/organizations/_pathlessLayout/$id/members"!</div>;
}
