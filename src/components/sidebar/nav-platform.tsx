import { getRouteApi, Link } from "@tanstack/react-router";
import { Home } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function NavPlatform() {
  const route = getRouteApi("/(app)/organizations/_pathlessLayout/$id");
  const { id } = route.useParams();

  const items = [
    {
      id: "dashboard",
      title: "Dashboard",
      url: "/organizations/$id/dashboard",
      icon: Home,
      isActive: false,
    },
    // {
    //   id: "members",
    //   title: "Members",
    //   url: `${appConfig.authRoutes.default}/${slug}/members`,
    //   icon: Users,
    //   isActive: false,
    // },
    // {
    //   id: "domains",
    //   title: "Domains",
    //   url: "/domains",
    //   icon: Globe,
    //   isActive: false,
    // },
    // {
    //   id: "billing",
    //   title: "Billing",
    //   url: "/billing",
    //   icon: CreditCard,
    //   isActive: false,
    // },
    // {
    //   id: "settings",
    //   title: "Settings",
    //   url: `${appConfig.authRoutes.default}/${slug}/settings`,
    //   icon: Settings,
    //   isActive: false,
    // },
  ];

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem id={item.id} key={item.id}>
            <SidebarMenuButton asChild isActive={item.isActive}>
              <Link params={{ id }} to={item.url}>
                <item.icon />
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
