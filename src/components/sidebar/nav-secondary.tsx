import { HelpCircle } from "lucide-react";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function NavSecondary() {
  return (
    <SidebarMenu>
      <SidebarMenuItem key={"how-it-works"}>
        <SidebarMenuButton className="cursor-pointer">
          <HelpCircle />
          <span>How it works</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
