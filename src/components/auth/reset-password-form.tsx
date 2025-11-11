import { useForm } from "@tanstack/react-form";
import { getRouteApi } from "@tanstack/react-router";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { appConfig, MIN_PASSWORD_LENGTH } from "@/constants/config";
import { authClient } from "@/lib/auth/auth-client";

const resetPasswordUserSchema = z.object({
  password: z.string().min(MIN_PASSWORD_LENGTH, {
    message: "Password must be at least 8 characters",
  }),
});

export function ResetPasswordForm() {
  const route = getRouteApi("/(auth)/reset-password");
  const searchParams = route.useSearch();
  const token = searchParams.token;

  if (!token) {
    toast.error("Invalid token");
    window.location.href = appConfig.authRoutes.signin;
  }

  const form = useForm({
    defaultValues: { password: "" },
    validators: {
      onChange: resetPasswordUserSchema,
      onSubmit: resetPasswordUserSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        const { error } = await authClient.resetPassword({
          newPassword: value.password,
          token: token as string,
        });
        if (error) {
          toast.error(error.message);
        } else {
          toast.success("Password reset successfully");
          window.location.href = appConfig.authRoutes.signin;
        }
      } catch {
        toast.error("Error resetting password");
      } finally {
        form.reset();
      }
    },
  });

  return (
    <form
      id="reset-password-form"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <FieldGroup className="gap-4">
        <form.Field
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>New Password</FieldLabel>
                <Input
                  aria-invalid={isInvalid}
                  id={field.name}
                  name={field.name}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="********"
                  type="password"
                  value={field.state.value}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
          name="password"
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
              form="reset-password-form"
              loading={isSubmitting}
              size="sm"
              type="submit"
            >
              Reset password
            </Button>
          )}
        </form.Subscribe>
      </FieldGroup>
    </form>
  );
}
