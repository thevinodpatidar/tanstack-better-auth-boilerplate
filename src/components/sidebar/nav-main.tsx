import { useNavigate, useRouterState } from "@tanstack/react-router";
import {
  ChevronRight,
  type LucideIcon,
  RectangleEllipsis,
  Zap,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const items: {
  title: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean;
  isNested?: boolean;
  items?: { title: string; url: string }[];
}[] = [
  {
    title: "Forms",
    url: "/forms",
    icon: RectangleEllipsis,
    isActive: false,
    isNested: false,
    items: [],
  },
  {
    title: "Integrations",
    url: "/integrations",
    icon: Zap,
    isActive: false,
    isNested: false,
    items: [],
  },
];

export function NavMain() {
  const navigate = useNavigate();

  const routerState = useRouterState();
  const pathname = routerState.location.pathname;

  const isActive = (url: string) => pathname.includes(url);

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            asChild
            className="group/collapsible"
            defaultOpen={isActive(item.url)}
            key={item.title}
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton
                  className={cn(isActive(item.url) && "bg-muted")}
                  onClick={() => {
                    navigate({ to: item.url });
                  }}
                  tooltip={item.title}
                >
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  {item.isNested && (
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  )}
                </SidebarMenuButton>
              </CollapsibleTrigger>
              {item.isNested && (
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => (
                      <SidebarMenuSubItem key={subItem?.title}>
                        <SidebarMenuSubButton asChild>
                          <a href={subItem?.url}>
                            <span>{subItem?.title}</span>
                          </a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              )}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
