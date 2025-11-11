import { createFileRoute } from "@tanstack/react-router";
import { SparklesIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const Route = createFileRoute("/(app)/profile/_pathlessLayout/api-keys")(
  { component: RouteComponent }
);

function RouteComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>API Keys</CardTitle>
        <CardDescription>You can manage your API keys.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <SparklesIcon className="mx-auto size-8 text-muted-foreground" />
        <p className="text-center text-muted-foreground text-sm">
          This feature is coming soon.
        </p>
      </CardContent>
      <Separator />
      <CardFooter className="flex flex-row justify-between gap-4">
        <p className="text-muted-foreground text-sm">
          You can manage your API keys.
        </p>
      </CardFooter>
    </Card>
  );
}
