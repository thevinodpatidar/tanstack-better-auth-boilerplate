import { getRouteApi, useNavigate } from "@tanstack/react-router";
import {
  BellIcon,
  HomeIcon,
  LogOutIcon,
  type LucideIcon,
  MoonIcon,
  SearchIcon,
  SettingsIcon,
  SunIcon,
  UserIcon,
  Users2Icon,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command";
import { appConfig } from "@/constants/config";
import { authClient } from "@/lib/auth/auth-client";
import { cn } from "@/lib/utils";

type CommandMenuItem = {
  icon: LucideIcon;
  label: string;
  shortcut?: string;
  href?: string;
  action?: () => void;
  keywords?: string[];
  disabled?: boolean;
};

type CommandMenuSection = {
  heading: string;
  items: CommandMenuItem[];
};

export function SidebarCommand({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const navigate = useNavigate();
  const route = getRouteApi("/(app)/organizations/_pathlessLayout/$id");
  const { id } = route.useParams();

  const { data: session } = authClient.useSession();
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  // Handle keyboard shortcut
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(true);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const sections: CommandMenuSection[] = [
    {
      heading: "Navigation",
      items: [
        {
          icon: HomeIcon,
          label: "Home",
          shortcut: "H",
          href: "/",
          keywords: ["dashboard", "main"],
        },
        {
          icon: SettingsIcon,
          label: "Settings",
          href: `${appConfig.authRoutes.default}/${id}/settings`,
          keywords: ["preferences", "config", "options"],
        },
        {
          icon: Users2Icon,
          label: "Members",
          href: `${appConfig.authRoutes.default}/${id}/members`,
          keywords: ["users", "collaborators", "invite"],
        },
      ],
    },
    {
      heading: "Account",
      items: [
        {
          icon: UserIcon,
          label: "Profile",
          href: `${appConfig.authRoutes.default}/${id}/profile/personal-details`,
          keywords: ["personal", "details", "account"],
        },
        {
          icon: BellIcon,
          label: "Notifications",
          href: "/settings/notifications",
          disabled: true,
          keywords: ["alerts", "messages"],
        },
      ],
    },
    {
      heading: "Theme",
      items: [
        {
          icon: theme === "dark" ? SunIcon : MoonIcon,
          label: theme === "dark" ? "Light Mode" : "Dark Mode",
          shortcut: "T",
          action: () => setTheme(theme === "dark" ? "light" : "dark"),
          keywords: ["dark", "light", "appearance", "mode"],
        },
      ],
    },
    {
      heading: "Session",
      items: [
        {
          icon: LogOutIcon,
          label: "Sign Out",
          shortcut: "⇧L",
          action: () =>
            authClient.signOut({
              fetchOptions: {
                onSuccess: () => navigate({ to: appConfig.authRoutes.signin }),
              },
            }),
          keywords: ["logout", "exit"],
        },
      ],
    },
  ];

  // Filter out commands that require user session if not logged in
  const filteredSections = session
    ? sections
    : sections.filter(
        (section) =>
          section.heading !== "Account" && section.heading !== "Session"
      );

  function runCommand(command: CommandMenuItem) {
    if (command.href) {
      navigate({ to: command.href });
    } else if (command.action) {
      command.action();
    }

    setOpen(false);
  }

  return (
    <div className={cn("relative w-full", className)} {...props}>
      <div className="relative">
        <SearchIcon
          aria-hidden="true"
          className="absolute top-2.5 left-2 h-4 w-4 text-muted-foreground"
        />
        <button
          className="flex h-9 w-full cursor-pointer items-center rounded-md border border-input bg-background py-2 pr-2 pl-8 text-sm"
          onClick={() => setOpen(true)}
          type="button"
        >
          <span className="text-muted-foreground">Search...</span>
          <div className="ml-auto flex items-center gap-1 rounded border bg-muted px-1.5 font-medium font-mono text-[10px]">
            <span className="text-xs">⌘</span>K
          </div>
        </button>
      </div>

      <CommandDialog onOpenChange={setOpen} open={open}>
        <CommandInput
          onValueChange={setQuery}
          placeholder="Type a command or search..."
          value={query}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          {filteredSections.map((section) => (
            <CommandGroup heading={section.heading} key={section.heading}>
              {section.items
                .filter(
                  (item) =>
                    !query ||
                    item.label.toLowerCase().includes(query.toLowerCase()) ||
                    item.keywords?.some((keyword) =>
                      keyword.toLowerCase().includes(query.toLowerCase())
                    )
                )
                .map((item) => (
                  <CommandItem
                    className={cn(
                      "cursor-pointer",
                      item.disabled && "cursor-not-allowed opacity-50"
                    )}
                    key={item.label}
                    onSelect={() => (item.disabled ? null : runCommand(item))}
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    <span>{item.label}</span>
                    {item.shortcut && (
                      <CommandShortcut>{item.shortcut}</CommandShortcut>
                    )}
                  </CommandItem>
                ))}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>
    </div>
  );
}
