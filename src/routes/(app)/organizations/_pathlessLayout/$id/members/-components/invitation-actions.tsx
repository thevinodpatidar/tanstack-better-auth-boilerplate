"use client";

import { getRouteApi } from "@tanstack/react-router";
import { RefreshCw } from "lucide-react";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  cancelInvitationMutationOptions,
  resendInvitationMutationOptions,
} from "@/lib/organization/mutations";
import type { OrganizationMemberRole } from "@/types/organizations";

type InvitationActionsProps = {
  invitationId: string;
  email: string;
  role: OrganizationMemberRole;
};

export function InvitationActions({
  invitationId,
  email,
  role,
}: InvitationActionsProps) {
  const [openCancelAlert, setOpenCancelAlert] = useState(false);
  const [openResendAlert, setOpenResendAlert] = useState(false);
  const route = getRouteApi(
    "/(app)/organizations/_pathlessLayout/$id/members/"
  );
  const { id } = route.useParams();

  const { mutate: cancelInvitation, isPending: isCancelling } =
    cancelInvitationMutationOptions(id, invitationId);
  const { mutate: resendInvitation, isPending: isResending } =
    resendInvitationMutationOptions(id, email, role);

  return (
    <div className="flex items-center gap-2">
      <AlertDialog onOpenChange={setOpenResendAlert} open={openResendAlert}>
        <AlertDialogTrigger asChild>
          <Button
            disabled={isResending || isCancelling}
            size="sm"
            variant="outline"
          >
            <RefreshCw className="size-4" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Resend Invitation?</AlertDialogTitle>
            <AlertDialogDescription>
              This will send a new invitation email to {email}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isResending}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              disabled={isResending}
              onClick={() => resendInvitation()}
            >
              Resend Invitation
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog onOpenChange={setOpenCancelAlert} open={openCancelAlert}>
        <AlertDialogTrigger asChild>
          <Button
            disabled={isCancelling || isResending}
            size="sm"
            variant="destructive"
          >
            Cancel
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Invitation?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently cancel the invitation sent to {email}. They
              won&apos;t be able to join using this invitation.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isCancelling}>
              No, keep it
            </AlertDialogCancel>
            <AlertDialogAction
              disabled={isCancelling}
              onClick={() => cancelInvitation()}
            >
              Yes, cancel invitation
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
