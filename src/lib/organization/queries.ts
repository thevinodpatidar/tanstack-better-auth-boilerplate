import { queryOptions } from "@tanstack/react-query";
import {
  $checkOrganizationWithId,
  $getFullOrganization,
  $getOrganizationInvitations,
  $getOrganizationMembers,
  $listOrganizationsWithMemberCount,
} from "./functions";

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

export const getOrganizationMembersQueryOptions = (organizationId: string) =>
  queryOptions({
    queryKey: ["get-organization-members", organizationId],
    queryFn: ({ signal }) =>
      $getOrganizationMembers({ signal, data: { organizationId } }),
  });

export type GetOrganizationMembersQueryResult = Awaited<
  ReturnType<typeof $getOrganizationMembers>
>;

export const getOrganizationInvitationsQueryOptions = (
  organizationId: string
) =>
  queryOptions({
    queryKey: ["get-organization-invitations", organizationId],
    queryFn: ({ signal }) =>
      $getOrganizationInvitations({ signal, data: { organizationId } }),
  });

export type GetOrganizationInvitationsQueryResult = Awaited<
  ReturnType<typeof $getOrganizationInvitations>
>;

export const getFullOrganizationQueryOptions = (organizationId: string) =>
  queryOptions({
    queryKey: ["get-full-organization", organizationId],
    queryFn: ({ signal }) =>
      $getFullOrganization({ signal, data: { organizationId } }),
  });

export type GetFullOrganizationQueryResult = Awaited<
  ReturnType<typeof $getFullOrganization>
>;
