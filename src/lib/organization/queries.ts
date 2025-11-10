import { queryOptions } from "@tanstack/react-query";
import {
  $checkOrganizationWithId,
  $checkUserOrganizations,
  $listOrganizationsWithMemberCount,
} from "./functions";

export const checkUserOrganizationsQueryOptions = () =>
  queryOptions({
    queryKey: ["check-user-organizations"],
    queryFn: ({ signal }) => $checkUserOrganizations({ signal }),
  });

export type CheckUserOrganizationsQueryResult = Awaited<
  ReturnType<typeof $checkUserOrganizations>
>;

export const checkOrganizationWithIdQueryOptions = (organizationId: string) =>
  queryOptions({
    queryKey: ["check-organization-with-id", organizationId],
    queryFn: ({ signal }) =>
      $checkOrganizationWithId({ signal, data: { organizationId } }),
  });

export type CheckOrganizationWithIdQueryResult = Awaited<
  ReturnType<typeof $checkOrganizationWithId>
>;

export const listOrganizationsWithMemberCountQueryOptions = () =>
  queryOptions({
    queryKey: ["list-organizations-with-member-count"],
    queryFn: ({ signal }) => $listOrganizationsWithMemberCount({ signal }),
  });

export type ListOrganizationsWithMemberCountQueryResult = Awaited<
  ReturnType<typeof $listOrganizationsWithMemberCount>
>;