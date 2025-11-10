import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { authClient } from "../auth/auth-client";
import { authQueryOptions } from "../auth/queries";

export const setActiveOrganizationMutationOptions = (
  organizationId: string,
  organizationSlug: string
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["set-active-organization", organizationId, organizationSlug],
    mutationFn: () =>
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
