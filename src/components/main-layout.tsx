import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { TextEllipsis } from "@/components/ui/text-ellipsis";
import { cn } from "@/lib/utils";

// Types
type BreadcrumbItems = {
  label: string;
  href?: string;
};

type TopNavProps = {
  children: React.ReactNode;
  className?: string;
  breadcrumbs?: BreadcrumbItems[];
};

// Nested Components
function TopNavHeader({ breadcrumbs }: { breadcrumbs?: BreadcrumbItems[] }) {
  return (
    <header className="sticky top-0 z-10 mr-2 flex h-12 shrink-0 items-center gap-2 bg-background px-4 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <SidebarTrigger className="-ml-1" />
      <Separator className="h-4!" orientation="vertical" />
      <Breadcrumb>
        <BreadcrumbList className="flex flex-wrap items-center gap-2">
          {breadcrumbs?.map((item, index) => (
            <React.Fragment key={item.label}>
              {index > 0 && <BreadcrumbSeparator className="block" />}
              <BreadcrumbItem className="block">
                {item.href ? (
                  <BreadcrumbLink href={item.href}>
                    <TextEllipsis width={120}>{item.label}</TextEllipsis>
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage>
                    <TextEllipsis width={120}>{item.label}</TextEllipsis>
                  </BreadcrumbPage>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </header>
  );
}

function MainArea({ children }: { children: React.ReactNode }) {
  return (
    <div className="@container flex flex-col gap-4 p-4 pt-0">{children}</div>
  );
}

// Main Component
export function MainLayout({ children, className, breadcrumbs }: TopNavProps) {
  return (
    <div className={cn("flex flex-col", className)}>
      <ScrollArea className="h-[calc(100svh-5px)]">
        <TopNavHeader breadcrumbs={breadcrumbs} />
        <MainArea>{children}</MainArea>
      </ScrollArea>
    </div>
  );
}
