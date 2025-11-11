import { createFileRoute } from "@tanstack/react-router";
import { MainLayout } from "@/components/main-layout";
import { InvitationsTable } from "./-components/invitations-table";
import { InviteMemberDialog } from "./-components/invite-member-dialog";
import { MembersTable } from "./-components/members-table";

export const Route = createFileRoute(
  "/(app)/organizations/_pathlessLayout/$id/members/"
)({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <MainLayout breadcrumbs={[{ label: "Members" }]}>
      <div className="space-y-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="font-semibold text-xl">Members</h1>
            <p className="text-muted-foreground text-sm">
              Invite people and assign organization roles
            </p>
          </div>
          <InviteMemberDialog />
        </div>
        <div className="space-y-8">
          <MembersTable />
        </div>
        <div className="flex flex-col justify-between gap-4">
          <InvitationsTable />
        </div>
      </div>
    </MainLayout>
  );
}
