import { useNavigate } from "@tanstack/react-router";
import type { Organization } from "better-auth/plugins";
import { Check } from "lucide-react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { OrganizationAvatar } from "@/components/ui/organization-avatar";
import { Spinner } from "@/components/ui/spinner";
import { TextEllipsis } from "@/components/ui/text-ellipsis";
import { authClient } from "@/lib/auth/auth-client";
import { setActiveOrganizationMutationOptions } from "@/lib/organization/mutations";
import { cn } from "@/lib/utils";

export function SwitcherItem({ organization }: { organization: Organization }) {
  const activeOrganization = authClient.useActiveOrganization();
  const activeOrganizationId = activeOrganization.data?.id;
  const navigate = useNavigate();

  // const pathAfterSlug = pathname.split("/").slice(3).join("/");

  // const setActiveOrganization = useAction(setActiveOrganizationAction);

  const { mutateAsync: setActiveOrganization, isPending } =
    setActiveOrganizationMutationOptions(organization.id, organization.slug);

  const handleClick = async () => {
    if (activeOrganizationId === organization.id) {
      return;
    }

    await setActiveOrganization();

    navigate({
      to: "/organizations/$id/dashboard",
      params: { id: organization.id },
    });
  };

  return (
    <DropdownMenuItem
      className={cn(
        "cursor-pointer gap-2 p-2",
        activeOrganizationId === organization.id && "bg-accent"
      )}
      onClick={(e) => {
        e.preventDefault();
        handleClick();
      }}
    >
      <OrganizationAvatar
        className="size-5"
        orgId={organization.id}
        orgName={organization.name}
      />
      <div className="flex flex-col">
        <TextEllipsis width={140}>{organization.name}</TextEllipsis>
      </div>
      {activeOrganizationId === organization.id && !isPending && (
        <Check className="ml-auto size-4 text-primary" />
      )}
      {isPending && <Spinner className="ml-auto" />}
    </DropdownMenuItem>
  );
}
