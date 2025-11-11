import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { authClient } from "@/lib/auth/auth-client";
import type { OrganizationMemberRole } from "@/types/organizations";

type Member = typeof authClient.$Infer.Member;

type UpdateMemberRoleDialogProps = {
  member: Member | null;
  open: boolean;
  setOpen: (open: boolean) => void;
};

export function UpdateMemberRoleDialog({
  member,
  open,
  setOpen,
}: UpdateMemberRoleDialogProps) {
  // const { data: activeOrganization } = authClient.useActiveOrganization();

  const form = useForm({
    defaultValues: { role: member?.role ?? "member" },
    validators: {
      onSubmit: z.object({
        role: z.enum(["owner", "admin", "member"]),
      }),
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  // useEffect(() => {
  //   if (member) {
  //     form.reset({ role: member.role ?? "member" });
  //   }
  // }, [member, form]);

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Member Role</DialogTitle>
          <DialogDescription>
            Update the member&apos;s role in the organization
          </DialogDescription>
        </DialogHeader>
        <form
          className="space-y-4"
          id="update-member-role-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          {/* <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select role</FormLabel>
                  <Select
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="owner">Owner</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="member">Member</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="w-full"
              loading={action.isExecuting}
              type="submit"
            >
              Update Role
            </Button> */}
          <FieldGroup>
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
                          field.handleChange(
                            e.currentTarget.value as OrganizationMemberRole
                          )
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
                  form="update-member-role-form"
                  loading={isSubmitting}
                  type="submit"
                >
                  Update Role
                </Button>
              )}
            </form.Subscribe>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}
