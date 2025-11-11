import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { authClient } from "@/lib/auth/auth-client";

const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(8, {
      message: "Current password must be at least 8 characters long",
    }),
    newPassword: z
      .string()
      .min(8, { message: "New password must be at least 8 characters long" }),
  })
  .superRefine(({ newPassword, currentPassword }, ctx) => {
    if (newPassword === currentPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "New password cannot be the same as the current password",
      });
    }
  });

export default function ChangePassword() {
  const form = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
    },
    validators: {
      onSubmit: changePasswordSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        const { data, error } = await authClient.changePassword({
          currentPassword: value.currentPassword,
          newPassword: value.newPassword,
          revokeOtherSessions: true,
        });
        if (error) {
          toast.error(error.message);
        }
        if (data) {
          toast.success("Password changed successfully");
        }
      } catch {
        toast.error("Failed to change password");
      } finally {
        form.reset();
      }
    },
  });

  return (
    <form
      className="space-y-4"
      id="change-password-form"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Change password</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <FieldGroup>
            <form.Field
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel>Enter your current password</FieldLabel>
                    <Input
                      aria-invalid={isInvalid}
                      autoComplete="off"
                      id={field.name}
                      name={field.name}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="********"
                      type="password"
                      value={field.state.value}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
              name="currentPassword"
            />
            <form.Field
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel>Enter your new password</FieldLabel>
                    <Input
                      aria-invalid={isInvalid}
                      autoComplete="off"
                      id={field.name}
                      name={field.name}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="********"
                      type="password"
                      value={field.state.value}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
              name="newPassword"
            />
          </FieldGroup>
        </CardContent>
        <Separator />
        <CardFooter className="flex flex-row justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            This action will update the password of the user.
          </p>
          <form.Subscribe
            selector={(formState) => [
              formState.canSubmit,
              formState.isSubmitting,
            ]}
          >
            {([canSubmit, isSubmitting]) => (
              <Button
                className="w-fit self-end"
                disabled={!canSubmit}
                form="change-password-form"
                loading={isSubmitting}
                size="sm"
                type="submit"
              >
                Change password
              </Button>
            )}
          </form.Subscribe>
        </CardFooter>
      </Card>
    </form>
  );
}
