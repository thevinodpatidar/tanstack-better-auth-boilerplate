import { IconSwitch2 } from "@tabler/icons-react";
import { Link, useNavigate } from "@tanstack/react-router";
import { ChevronDown, Settings, Users } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { OrganizationAvatar } from "@/components/ui/organization-avatar";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { TextEllipsis } from "@/components/ui/text-ellipsis";
import { authClient } from "@/lib/auth/auth-client";
import { Skeleton } from "../ui/skeleton";
import { CreateOrganizationModal } from "./create-organization";
import { Switcher } from "./switcher";

export function OrganizationDropdown() {
  const navigate = useNavigate();
  const {
    data: activeOrganization,
    isPending,
    isRefetching,
  } = authClient.useActiveOrganization();

  if (activeOrganization?.id === null) {
    navigate({ to: "/organizations" });
  }
  const activeOrganizationId = activeOrganization?.id;

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          {isPending || isRefetching ? (
            <Skeleton className="h-8 w-full" />
          ) : (
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton className="w-fit px-1.5">
                <OrganizationAvatar
                  orgId={activeOrganizationId ?? ""}
                  orgName={activeOrganization?.name ?? ""}
                />
                <span className="truncate font-semibold">
                  <TextEllipsis width={140}>
                    {activeOrganization?.name ?? ""}
                  </TextEllipsis>
                </span>
                <ChevronDown className="opacity-50" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
          )}
          <DropdownMenuContent
            align="start"
            className="w-64 rounded-lg"
            side="bottom"
            sideOffset={4}
          >
            <DropdownMenuItem className="flex items-center gap-2">
              <OrganizationAvatar
                orgId={activeOrganization?.id ?? ""}
                orgName={activeOrganization?.name ?? ""}
              />
              <span className="truncate font-semibold">
                {activeOrganization?.name ?? ""}
              </span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel className="text-muted-foreground text-xs">
              Actions
            </DropdownMenuLabel>
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link
                className="flex items-center gap-2"
                params={{ id: activeOrganizationId ?? "" }}
                to={"/organizations/$id/members"}
              >
                <Users />
                <span>Members</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link
                className="flex items-center gap-2"
                params={{ id: activeOrganizationId ?? "" }}
                to={"/organizations/$id/settings"}
              >
                <Settings />
                <span>Settings</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <IconSwitch2 />
              <Switcher />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <CreateOrganizationModal />
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
