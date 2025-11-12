import { useNavigate } from "@tanstack/react-router";
import { ChevronsUpDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth/auth-client";
import { OrganizationAvatar } from "../ui/organization-avatar";
import { Skeleton } from "../ui/skeleton";
import { CreateOrganizationModal } from "./create-organization-modal";
import { SwitcherItem } from "./switcher-item";

export function OrganizationSwitcher() {
  const { isMobile } = useSidebar();
  const navigate = useNavigate();

  const organizations = authClient.useListOrganizations();
  const { data: activeOrganization, isPending } =
    authClient.useActiveOrganization();

  if (activeOrganization?.id === null) {
    navigate({ to: "/organizations" });
  }
  const activeOrganizationId = activeOrganization?.id;

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild disabled={isPending}>
            {isPending ? (
              <div className="flex w-full items-center justify-start gap-2 rounded-lg bg-accent/40 p-1">
                <Skeleton className="size-10 shrink-0 rounded-lg" />
                <div className="flex flex-col gap-1">
                  <Skeleton className="h-3 w-40 rounded-lg" />
                  <Skeleton className="h-3 w-16 rounded-lg" />
                </div>
              </div>
            ) : (
              <SidebarMenuButton
                className="bg-muted data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                size="lg"
              >
                <OrganizationAvatar
                  className="size-8 shrink-0"
                  orgId={activeOrganizationId ?? ""}
                  orgName={activeOrganization?.name ?? ""}
                />
                <div className="grid flex-1 select-none text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {activeOrganization?.name ?? ""}
                  </span>
                  <span className="truncate text-[10px] text-muted-foreground">
                    {activeOrganization?.slug ?? ""}
                  </span>
                </div>
                <ChevronsUpDown className="ml-auto" />
              </SidebarMenuButton>
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-muted-foreground text-xs">
              Organizations
            </DropdownMenuLabel>
            <div className="flex flex-col gap-1">
              {organizations.data?.map((organization) => (
                <SwitcherItem
                  key={organization.id}
                  organization={organization}
                />
              ))}
            </div>
            <DropdownMenuSeparator />
            <CreateOrganizationModal />
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
