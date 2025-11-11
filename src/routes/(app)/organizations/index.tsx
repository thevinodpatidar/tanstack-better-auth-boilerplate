import { useQueryClient } from "@tanstack/react-query";
import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { LogOut, Plus, Settings } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth/auth-client";
import { authQueryOptions } from "@/lib/auth/queries";
import { listOrganizationsWithMemberCountQueryOptions } from "@/lib/organization/queries";
import { OrganizationCard } from "./-components/organization-card";

export const Route = createFileRoute("/(app)/organizations/")({
  component: RouteComponent,
  loader: async ({ context }) => {
    const data = await context.queryClient.ensureQueryData({
      ...listOrganizationsWithMemberCountQueryOptions(),
      revalidateIfStale: true,
    });
    return data;
  },
});

function RouteComponent() {
  const data = Route.useLoaderData();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: session } = authClient.useSession();
  const { organizations, memberCountMap } = data;

  return (
    <div className="mx-auto flex h-svh max-w-3xl flex-col gap-6 px-4 py-12">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="font-bold text-2xl tracking-tight">
            Your Organizations
          </h1>
          <p className="text-md text-muted-foreground">
            Select an organization to access its dashboard
          </p>
        </div>
        <div className="flex gap-2">
          <Link to="/organizations/create">
            <Button size="sm">
              <Plus />
              Create Organization
            </Button>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar className="size-8 rounded-lg">
                <AvatarImage
                  alt={session?.user?.name}
                  src={session?.user?.image ?? ""}
                />
                <AvatarFallback className="rounded-lg">
                  {session?.user?.name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="size-8 rounded-lg">
                    <AvatarImage
                      alt={session?.user?.name}
                      src={session?.user?.image ?? ""}
                    />
                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {session?.user?.name}
                    </span>
                    <span className="truncate text-xs">
                      {session?.user?.email}
                    </span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem
                  className="w-full cursor-pointer"
                  onClick={() =>
                    router.navigate({ to: "/profile/personal-details" })
                  }
                >
                  <Settings className="size-4" />
                  <span className="text-sm">Profile Settings</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() =>
                  authClient.signOut({
                    fetchOptions: {
                      onResponse: async () => {
                        // manually set to null to avoid unnecessary refetching
                        queryClient.setQueryData(
                          authQueryOptions().queryKey,
                          null
                        );
                        await router.invalidate();
                      },
                    },
                  })
                }
              >
                <LogOut className="size-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {organizations.map((organization) => (
          <OrganizationCard
            key={organization.id}
            memberCount={memberCountMap.get(organization.id) || 0}
            organization={organization}
          />
        ))}
      </div>
    </div>
  );
}
