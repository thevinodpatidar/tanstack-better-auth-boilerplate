import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth/auth-client";
import { SwitcherItem } from "./switcher-item";

export function Switcher() {
  const organizations = authClient.useListOrganizations();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex w-full cursor-pointer items-center gap-2">
        <span>Switch Organization</span>
        <ChevronDown className="ml-auto size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="w-64 rounded-lg"
        side="bottom"
        sideOffset={4}
      >
        <DropdownMenuLabel className="text-muted-foreground text-xs">
          Organizations
        </DropdownMenuLabel>
        {/* <ScrollArea className="max-h-[250px] h-[200px]"> */}
        {organizations.data?.map((organization) => (
          <SwitcherItem key={organization.id} organization={organization} />
        ))}
        {/* </ScrollArea> */}
        {/* <DropdownMenuSeparator /> */}
        {/* <CreateOrganizationModal /> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
