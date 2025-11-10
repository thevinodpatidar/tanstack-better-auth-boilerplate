import { IconFlowerFilled } from "@tabler/icons-react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CreateOrganizationForm } from "@/components/create-organization-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const Route = createFileRoute("/(app)/organizations/create")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex h-svh flex-col items-center justify-center gap-4">
      <Card className="w-full max-w-xs sm:max-w-sm">
        <CardHeader className="flex flex-col items-center gap-2">
          <IconFlowerFilled className="size-8" />
          <CardTitle className="flex items-center justify-between">
            <span>Create Organization</span>
          </CardTitle>
          <CardDescription>
            Create a new organization to get started
          </CardDescription>
          <Link
            className="text-muted-foreground text-sm underline underline-offset-3 hover:text-primary"
            to="/organizations"
          >
            View all
          </Link>
        </CardHeader>
        <CardContent>
          <CreateOrganizationForm />
        </CardContent>
      </Card>
    </div>
  );
}
