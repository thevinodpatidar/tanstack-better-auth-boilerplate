import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { Laptop } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { authClient } from "@/lib/auth/auth-client";
import { authQueryOptions } from "@/lib/auth/queries";
import {
  revokeOtherSessionsMutationOptions,
  revokeSessionMutationOptions,
} from "@/lib/users/mutations";
import {
  currentSessionQueryOptions,
  listActiveSessionsQueryOptions,
} from "@/lib/users/queries";
import { parseUserAgent } from "@/lib/utils";

export const Route = createFileRoute(
  "/(app)/profile/_pathlessLayout/active-sessions"
)({
  component: RouteComponent,
});

function RouteComponent() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data: sessions, isLoading } = useQuery(
    listActiveSessionsQueryOptions()
  );

  const { data: currentSession } = useQuery(currentSessionQueryOptions());

  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(
    null
  );

  const revokeSession = revokeSessionMutationOptions();

  const revokeOtherSessions = revokeOtherSessionsMutationOptions();

  return (
    <Card className="rounded-2xl border bg-card text-card-foreground shadow-sm">
      <CardHeader>
        <CardTitle>Sessions</CardTitle>
        <CardDescription>
          Manage your active sessions and revoke access.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {isLoading
          ? Array.from({ length: 3 }).map((_, index) => (
              <Skeleton
                className="h-16 w-full"
                key={`skeleton-${index.toString()}`}
              />
            ))
          : sessions?.map((session) => {
              const isCurrent = session.id === currentSession?.id;
              const { browser, device } = parseUserAgent(
                session.userAgent ?? undefined
              );
              return (
                <div
                  className="flex items-center justify-between rounded-xl border bg-background/50 px-6 py-4"
                  key={session.id}
                >
                  <div className="flex items-center gap-3">
                    <Laptop className="h-5 w-5 text-muted-foreground" />
                    <span className="font-medium text-sm">
                      {isCurrent ? "Current Session" : `${browser}, ${device}`}
                    </span>
                  </div>
                  <Button
                    disabled={
                      revokeSession.isPending &&
                      selectedSessionId === session.id
                    }
                    loading={
                      revokeSession.isPending &&
                      selectedSessionId === session.id
                    }
                    onClick={() => {
                      setSelectedSessionId(session.id);
                      if (isCurrent) {
                        authClient.signOut({
                          fetchOptions: {
                            onResponse: async () => {
                              queryClient.setQueryData(
                                authQueryOptions().queryKey,
                                null
                              );
                              await router.invalidate();
                            },
                          },
                        });
                      } else {
                        revokeSession.mutate(session.token);
                      }
                    }}
                    size="sm"
                    variant="outline"
                  >
                    {isCurrent ? "Sign Out" : "Revoke"}
                  </Button>
                </div>
              );
            })}
      </CardContent>
      <Separator />
      <CardFooter className="flex flex-row justify-between gap-4">
        <p className="text-muted-foreground text-sm">
          This action will revoke all sessions except the current one.
        </p>
        <Button
          disabled={
            revokeOtherSessions.isPending || (sessions?.length ?? 0) <= 1
          }
          loading={revokeOtherSessions.isPending}
          onClick={() => revokeOtherSessions.mutate()}
          size="sm"
          type="button"
        >
          Revoke Other Sessions
        </Button>
      </CardFooter>
    </Card>
  );
}
