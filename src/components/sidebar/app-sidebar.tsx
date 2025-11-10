import type * as React from "react";
import { NavUser } from "@/components/sidebar/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { OrganizationDropdown } from "../organization-switcher/organization-dropdown";
import { NavPlatform } from "./nav-platform";
import { NavSecondary } from "./nav-secondary";
import { SidebarCommand } from "./sidebar-command";

type AppSidebarProps = React.ComponentProps<typeof Sidebar>;

export function AppSidebar({ ...props }: AppSidebarProps) {
  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader>
        <OrganizationDropdown />
        <SidebarCommand />
        <NavPlatform />
      </SidebarHeader>
      <SidebarContent>{/* <NavWorkspaces /> */}</SidebarContent>
      <SidebarFooter>
        <NavSecondary />
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
