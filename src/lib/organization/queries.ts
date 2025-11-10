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

export const checkOrganizationWithIdQueryOptions = (
  organizationId: string,
  userId: string
) =>
  queryOptions({
    queryKey: ["check-organization-with-id", organizationId, userId],
    queryFn: ({ signal }) =>
      $checkOrganizationWithId({ signal, data: { organizationId, userId } }),
  });

export type CheckOrganizationWithIdQueryResult = Awaited<
  ReturnType<typeof $checkOrganizationWithId>
>;

export const listOrganizationsWithMemberCountQueryOptions = (userId: string) =>
  queryOptions({
    queryKey: ["list-organizations-with-member-count", userId],
    queryFn: ({ signal }) =>
      $listOrganizationsWithMemberCount({ signal, data: { userId } }),
  });

export type ListOrganizationsWithMemberCountQueryResult = Awaited<
  ReturnType<typeof $listOrganizationsWithMemberCount>
>;