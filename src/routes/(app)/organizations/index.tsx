import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/organizations/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      Hello "/(app)/organizations/"!
      <Link
        params={{ id: "uYIoojt5ecCJCgsT9yE7e7AdyvGyVszs" }}
        to="/organizations/$id"
      >
        Organization 1
      </Link>
    </div>
  );
}
