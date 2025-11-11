import { useForm } from "@tanstack/react-form";
import { useRouter } from "@tanstack/react-router";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { appConfig } from "@/constants/config";
import { authClient } from "@/lib/auth/auth-client";

const forgotPasswordSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
  sendEmailOTP: z.boolean(),
});

export function ForgotPasswordForm() {
  const router = useRouter();

  const form = useForm({
    defaultValues: { email: "", sendEmailOTP: false },
    validators: {
      onSubmit: forgotPasswordSchema,
      onChange: forgotPasswordSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        if (value.sendEmailOTP) {
          const { error } = await authClient.emailOtp.sendVerificationOtp({
            email: value.email,
            type: "forget-password",
          });
          if (error) {
            toast.error(error.message);
          } else {
            toast.success("OTP sent to your email");
            router.navigate({
              to: appConfig.authRoutes.verifyOtp,
              search: {
                email: encodeURIComponent(value.email),
                type: "forget-password",
              },
            });
          }
        } else {
          const { error } = await authClient.forgetPassword({
            email: value.email,
            redirectTo: appConfig.authRoutes.resetPassword,
          });
          if (error) {
            toast.error(error.message);
          } else {
            toast.success("Password reset link sent to email");
          }
        }
      } catch {
        toast.error("Oops! Something broke on our end");
      } finally {
        form.reset();
      }
    },
  });

  return (
    <form
      id="forgot-password-form"
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
                <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                <Input
                  aria-invalid={isInvalid}
                  id={field.name}
                  name={field.name}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="m@example.com"
                  type="email"
                  value={field.state.value}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
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
              <Field orientation="horizontal">
                <Checkbox
                  aria-invalid={isInvalid}
                  checked={field.state.value}
                  id={field.name}
                  name={field.name}
                  onBlur={field.handleBlur}
                  onCheckedChange={(checked) =>
                    field.handleChange(checked === true)
                  }
                />
                <FieldContent>
                  <FieldLabel htmlFor={field.name}>Send email OTP</FieldLabel>
                  <FieldDescription>
                    We will send a one-time password to reset your password.
                  </FieldDescription>
                </FieldContent>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
          name="sendEmailOTP"
        />
        <form.Subscribe
          selector={(formState) => [
            formState.canSubmit,
            formState.isSubmitting,
            formState.values.sendEmailOTP,
          ]}
        >
          {([canSubmit, isSubmitting, sendEmailOTP]) => (
            <Button
              disabled={!canSubmit}
              form="forgot-password-form"
              loading={isSubmitting}
              size="sm"
              type="submit"
            >
              {sendEmailOTP ? "Send email OTP" : "Send reset link"}
            </Button>
          )}
        </form.Subscribe>
      </FieldGroup>
    </form>
  );
}
