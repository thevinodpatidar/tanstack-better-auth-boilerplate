import { useForm } from "@tanstack/react-form";
import { useQueryClient } from "@tanstack/react-query";
import { getRouteApi } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { authClient } from "@/lib/auth/auth-client";
import { getOrganizationInvitationsQueryOptions } from "@/lib/organization/queries";
import type { OrganizationMemberRole } from "@/types/organizations";

export function InviteMemberDialog() {
  const queryClient = useQueryClient();

  const route = getRouteApi(
    "/(app)/organizations/_pathlessLayout/$id/members/"
  );
  const { id } = route.useParams();

  const [open, setOpen] = useState(false);

  const form = useForm({
    defaultValues: {
      email: "",
      role: "member",
    },
    validators: {
      onSubmit: z.object({
        email: z.email({ message: "Invalid email address" }),
        role: z.enum(["member", "admin", "owner"]),
      }),
    },
    onSubmit: async ({ value }) => {
      const { error } = await authClient.organization.inviteMember({
        email: value.email,
        role: value.role as OrganizationMemberRole,
      });
      if (error) {
        toast.error(error.message || "Error inviting member");
      } else {
        queryClient.invalidateQueries({
          queryKey: getOrganizationInvitationsQueryOptions(id).queryKey,
        });
        toast.success("Member invited successfully");
        setOpen(false);
        form.reset();
      }
    },
  });

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button>Invite members</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite Member</DialogTitle>
          <DialogDescription>
            Invite a new member to your organization
          </DialogDescription>
        </DialogHeader>
        <form
          className="space-y-4"
          id="invite-member-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel>Email</FieldLabel>
                    <Input
                      aria-invalid={isInvalid}
                      autoComplete="off"
                      id={field.name}
                      name={field.name}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="member@email.com"
                      type="email"
                      value={field.state.value}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
              name="email"
            />
            <form.Field
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel>Role</FieldLabel>
                    <Select defaultValue={field.state.value}>
                      <SelectTrigger
                        aria-invalid={isInvalid}
                        id={field.name}
                        name={field.name}
                        onBlur={field.handleBlur}
                        onChange={(e) =>
                          field.handleChange(e.currentTarget.value)
                        }
                        value={field.state.value}
                      >
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="owner">Owner</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="member">Member</SelectItem>
                      </SelectContent>
                    </Select>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
              name="role"
            />
            <form.Subscribe
              selector={(formState) => [
                formState.canSubmit,
                formState.isSubmitting,
              ]}
            >
              {([canSubmit, isSubmitting]) => (
                <Button
                  disabled={!canSubmit}
                  form="invite-member-form"
                  loading={isSubmitting}
                  type="submit"
                >
                  Send Invitation
                </Button>
              )}
            </form.Subscribe>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}
