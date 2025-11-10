import { queryOptions } from "@tanstack/react-query";
import { $checkUserOrganizations } from "./functions";

export const checkUserOrganizationsQueryOptions = () =>
  queryOptions({
    queryKey: ["check-user-organizations"],
    queryFn: ({ signal }) => $checkUserOrganizations({ signal }),
  });

export type CheckUserOrganizationsQueryResult = Awaited<
  ReturnType<typeof $checkUserOrganizations>
>;
