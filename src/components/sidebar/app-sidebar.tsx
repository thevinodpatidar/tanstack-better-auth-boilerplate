import type * as React from "react";
import { NavUser } from "@/components/sidebar/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavPlatform } from "./nav-platform";
import { NavSecondary } from "./nav-secondary";
import { OrganizationSettings } from "./organization-settings";
import { OrganizationSwitcher } from "./organization-switcher";
import { SidebarCommand } from "./sidebar-command";

type AppSidebarProps = React.ComponentProps<typeof Sidebar>;

export function AppSidebar({ ...props }: AppSidebarProps) {
  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader>
        <OrganizationSwitcher />
        <SidebarCommand />
      </SidebarHeader>
      <SidebarContent>
        <OrganizationSettings />
        <NavPlatform />
      </SidebarContent>
      <SidebarFooter>
        <NavSecondary />
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
