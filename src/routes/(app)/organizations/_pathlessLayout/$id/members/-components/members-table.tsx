import { useQuery } from "@tanstack/react-query";
import { getRouteApi } from "@tanstack/react-router";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import type { authClient } from "@/lib/auth/auth-client";
import { getOrganizationMembersQueryOptions } from "@/lib/organization/queries";
import { UpdateMemberRoleDialog } from "./update-member-role";

type Member = typeof authClient.$Infer.Member;

export function MembersTable() {
  const [open, setOpen] = useState(false);
  const [member, setMember] = useState<Member | null>(null);

  const route = getRouteApi(
    "/(app)/organizations/_pathlessLayout/$id/members/"
  );
  const { id } = route.useParams();

  const {
    data: members,
    isLoading,
    isRefetching,
  } = useQuery({
    ...getOrganizationMembersQueryOptions(id),
  });

  if (isLoading || isRefetching) {
    return <Skeleton className="h-10 w-full" />;
  }

  if (!members || members.length === 0) {
    return (
      <div className="space-y-4">
        <p className="text-muted-foreground text-sm">No members found.</p>
      </div>
    );
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">User</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {members.map((m) => (
            <TableRow key={m.id}>
              <TableCell className="flex items-center gap-2">
                <Avatar className="size-8 rounded-lg">
                  <AvatarImage src={m.user.image ?? ""} />
                  <AvatarFallback className="rounded-lg">
                    {m.user.name?.charAt(0).toUpperCase() ||
                      m.user.email.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <TextEllipsis className="text-sm" width={160}>
                  {m.user.name || m.user.email}
                </TextEllipsis>
              </TableCell>
              <TableCell>{m.user.email}</TableCell>
              <TableCell>
                {m.role === "owner" && <Badge>Owner</Badge>}
                {m.role === "admin" && <Badge>Admin</Badge>}
                {m.role === "member" && <Badge>Member</Badge>}
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu modal={false}>
                  <DropdownMenuTrigger asChild>
                    <Button size="sm" variant="ghost">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onSelect={() => {
                        setMember(m as Member);
                        setOpen(true);
                      }}
                    >
                      Update Member
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-destructive"
                      onSelect={() => {
                        setMember(m as Member);
                        setOpen(true);
                      }}
                    >
                      Remove Member
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <UpdateMemberRoleDialog member={member} open={open} setOpen={setOpen} />
    </>
  );
}
