import { queryOptions } from "@tanstack/react-query";
import {
  $getCurrentSession,
  $listActiveSessions,
  $listLinkedAccounts,
  $listPasskeys,
} from "./functions";

export const listActiveSessionsQueryOptions = () =>
  queryOptions({
    queryKey: ["list-active-sessions"],
    queryFn: ({ signal }) => $listActiveSessions({ signal }),
  });

export type ListActiveSessionsQueryResult = Awaited<
  ReturnType<typeof $listActiveSessions>
>;

export const currentSessionQueryOptions = () =>
  queryOptions({
    queryKey: ["current-session"],
    queryFn: ({ signal }) => $getCurrentSession({ signal }),
  });

export type CurrentSessionQueryResult = Awaited<
  ReturnType<typeof $getCurrentSession>
>;

export const listLinkedAccountsQueryOptions = () =>
  queryOptions({
    queryKey: ["list-linked-accounts"],
    queryFn: ({ signal }) => $listLinkedAccounts({ signal }),
  });

export type ListLinkedAccountsQueryResult = Awaited<
  ReturnType<typeof $listLinkedAccounts>
>;

export const listPasskeysQueryOptions = () =>
  queryOptions({
    queryKey: ["list-passkeys"],
    queryFn: ({ signal }) => $listPasskeys({ signal }),
  });

export type ListPasskeysQueryResult = Awaited<ReturnType<typeof $listPasskeys>>;
