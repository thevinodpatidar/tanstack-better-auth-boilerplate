import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { OrganizationMemberRole } from "@/types/organizations";
import { authClient } from "../auth/auth-client";
import { authQueryOptions } from "../auth/queries";
import { getOrganizationInvitationsQueryOptions } from "./queries";

export const setActiveOrganizationMutationOptions = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["set-active-organization"],
    mutationFn: ({
      organizationId,
      organizationSlug,
    }: {
      organizationId: string;
      organizationSlug: string;
    }) =>
      authClient.organization.setActive({
        organizationId,
        organizationSlug,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authQueryOptions().queryKey });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const cancelInvitationMutationOptions = (
  organizationId: string,
  invitationId: string
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["cancel-invitation", organizationId, invitationId],
    mutationFn: () =>
      authClient.organization.cancelInvitation({ invitationId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey:
          getOrganizationInvitationsQueryOptions(organizationId).queryKey,
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const resendInvitationMutationOptions = (
  organizationId: string,
  email: string,
  role: OrganizationMemberRole
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["resend-invitation", organizationId, email, role],
    mutationFn: () =>
      authClient.organization.inviteMember({
        organizationId,
        email,
        role,
        resend: true,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey:
          getOrganizationInvitationsQueryOptions(organizationId).queryKey,
      });
    },
  });
};
