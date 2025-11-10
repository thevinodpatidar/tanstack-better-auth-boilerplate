import { createFileRoute, Outlet } from "@tanstack/react-router";
import Cookies from "js-cookie"; // Or your preferred cookie library
import { useState } from "react";
import { DefaultNotFound } from "@/components/default-not-found";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

const SIDEBAR_COOKIE_NAME = "sidebar_state";

export const Route = createFileRoute("/(app)/organizations/_pathlessLayout")({
  component: RouteComponent,
  notFoundComponent: () => <DefaultNotFound />,
});

function RouteComponent() {
  const [isSidebarOpen] = useState(() => {
    const storedState = Cookies.get(SIDEBAR_COOKIE_NAME);
    if (storedState === "true") {
      return true;
    }

    return true; // Default to false if no cookie or invalid value
  });

  return (
    <SidebarProvider defaultOpen={isSidebarOpen}>
      <AppSidebar />
      <SidebarInset className="h-svh overflow-y-hidden">
        <div className="flex flex-col gap-4">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
