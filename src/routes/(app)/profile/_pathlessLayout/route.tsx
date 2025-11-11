import { IconBrandOauth } from "@tabler/icons-react";
import {
  createFileRoute,
  Outlet,
  useNavigate,
  useRouterState,
} from "@tanstack/react-router";
import {
  ArrowLeftIcon,
  ChevronDown,
  Key,
  Monitor,
  Shield,
  Trash,
  Users2,
} from "lucide-react";
import { Suspense } from "react";
import { SignOutButton } from "@/components/signout-button";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { authClient } from "@/lib/auth/auth-client";

const profileSectionNav: {
  key: string;
  name: string;
  description: string;
  icon: React.ElementType;
  href: string;
}[] = [
  {
    key: "personal-details",
    name: "Personal Details",
    description: "Manage your personal details and preferences",
    icon: Users2,
    href: "/profile/personal-details",
  },
  {
    key: "security",
    name: "Security",
    description: "Manage your security settings",
    icon: Shield,
    href: "/profile/security",
  },
  {
    key: "providers",
    name: "Providers",
    description: "Manage your accounts with third-party providers.",
    icon: IconBrandOauth,
    href: "/profile/providers",
  },
  {
    key: "api-keys",
    name: "API Keys",
    description: "Manage your API keys",
    icon: Key,
    href: "/profile/api-keys",
  },
  {
    key: "active-sessions",
    name: "Active Sessions",
    description: "Manage your active sessions and revoke access.",
    icon: Monitor,
    href: "/profile/active-sessions",
  },
  {
    key: "danger-zone",
    name: "Danger Zone",
    description: "Delete your account",
    icon: Trash,
    href: "/profile/danger-zone",
  },
];

export const Route = createFileRoute("/(app)/profile/_pathlessLayout")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const routerState = useRouterState();
  const { data: sessionData } = authClient.useSession();
  const pathname = routerState.location.pathname;
  const activeItem = profileSectionNav.find((item) => item.href === pathname);

  return (
    <SidebarProvider className="flex flex-col overflow-hidden md:flex-row">
      <div className="flex flex-col gap-2 overflow-y-hidden">
        <Sidebar className="hidden md:flex" collapsible="none">
          <SidebarHeader className="flex flex-row items-center gap-2">
            <div className="ml-1 font-bold">Settings</div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {profileSectionNav.map((item) => (
                    <SidebarMenuItem key={item.key}>
                      <SidebarMenuButton
                        isActive={item.key === activeItem?.key}
                        onClick={() => navigate({ to: item.href })}
                      >
                        <item.icon />
                        <span>{item.name}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <SignOutButton className="w-full" />
            <Button
              className="w-full"
              onClick={() =>
                navigate({
                  to: "/organizations/$id/dashboard",
                  params: {
                    id: sessionData?.session.activeOrganizationId ?? "",
                  },
                })
              }
              size="sm"
              variant="outline"
            >
              <ArrowLeftIcon className="size-4" />
              Back
            </Button>
          </SidebarFooter>
        </Sidebar>
        <div className="flex flex-col gap-2 p-4 md:hidden">
          <DropdownMenu>
            <div className="flex flex-row items-center justify-between gap-2">
              <Button onClick={() => window.history.back()} variant="outline">
                <ArrowLeftIcon className="size-4" />
                Back
              </Button>
              <DropdownMenuTrigger className="flex justify-between md:hidden">
                <Button className="w-fit self-end" variant="outline">
                  {activeItem?.name}
                  <ChevronDown className="size-4" />
                </Button>
              </DropdownMenuTrigger>
            </div>
            <DropdownMenuContent className="w-56">
              {profileSectionNav.map((item) => (
                <DropdownMenuItem
                  key={item.key}
                  onClick={() => navigate({ to: item.href })}
                >
                  <item.icon />
                  <span>{item.name}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <main className="flex h-[calc(100vh-2rem)] flex-1 flex-col gap-4 overflow-y-auto p-4">
        <ScrollArea className="flex flex-1 flex-col gap-4">
          <Suspense
            fallback={
              <div className="flex flex-col gap-4">
                <Skeleton className="h-40" />
                <Skeleton className="h-40" />
              </div>
            }
          >
            <Outlet />
          </Suspense>
        </ScrollArea>
      </main>
    </SidebarProvider>
  );
}
