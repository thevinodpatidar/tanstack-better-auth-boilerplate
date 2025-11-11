import { useQuery } from "@tanstack/react-query";
import { getRouteApi } from "@tanstack/react-router";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TextEllipsis } from "@/components/ui/text-ellipsis";
import { getOrganizationInvitationsQueryOptions } from "@/lib/organization/queries";
import { InvitationActions } from "./invitation-actions";

export function InvitationsTable() {
  const route = getRouteApi(
    "/(app)/organizations/_pathlessLayout/$id/members/"
  );
  const { id } = route.useParams();

  const {
    data: invitations,
    isLoading,
    isRefetching,
  } = useQuery({
    ...getOrganizationInvitationsQueryOptions(id),
  });

  if (isLoading || isRefetching) {
    return <Skeleton className="h-10 w-full" />;
  }

  if (!invitations || invitations.length === 0) {
    return (
      <div className="space-y-4">
        <p className="text-muted-foreground text-sm">No invitations found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="font-bold text-xl">Invitations</h1>
          <div className="text-muted-foreground text-sm">
            (
            {
              invitations.filter(
                (invitation) => invitation.status === "pending"
              ).length
            }
            )
          </div>
        </div>
        <p className="text-muted-foreground text-sm">
          Manage your invitations and accept or decline them.
        </p>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Expires</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {invitations
            .filter((invitation) => invitation.status === "pending")
            .map((invitation) => (
              <TableRow key={invitation.id}>
                <TableCell className="flex items-center gap-2">
                  <Avatar className="size-8 rounded-lg">
                    <AvatarImage src={invitation.email} />
                    <AvatarFallback className="rounded-lg">
                      {invitation.email.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <TextEllipsis className="text-sm" width={160}>
                    {invitation.email}
                  </TextEllipsis>
                </TableCell>
                <TableCell>
                  <Badge>
                    {invitation.role === "member" && "Member"}
                    {invitation.role === "owner" && "Owner"}
                    {invitation.role === "admin" && "Admin"}
                  </Badge>
                </TableCell>
                <TableCell>
                  {invitation.status === "pending" ? (
                    <Badge variant="outline">Pending</Badge>
                  ) : (
                    <Badge variant="outline">
                      {invitation.status === "accepted"
                        ? "Accepted"
                        : "Declined"}
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {format(invitation.expiresAt, "MMM d, yyyy")}
                </TableCell>
                <TableCell>
                  <InvitationActions
                    email={invitation.email}
                    invitationId={invitation.id}
                    role={invitation.role}
                  />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
