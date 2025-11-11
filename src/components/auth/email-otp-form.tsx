import { useForm } from "@tanstack/react-form";
import { useRouter } from "@tanstack/react-router";
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
import { appConfig } from "@/constants/config";
import { authClient } from "@/lib/auth/auth-client";

export type EmailOtpType = "sign-in" | "email-verification" | "forget-password";

const emailOtpUserSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
});

export function EmailOtpForm({ type }: { type: EmailOtpType }) {
  const router = useRouter();

  const form = useForm({
    defaultValues: { email: "" },
    validators: {
      onChange: emailOtpUserSchema,
      onSubmit: emailOtpUserSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        await authClient.emailOtp.sendVerificationOtp(
          { email: value.email, type },
          {
            onError() {
              toast.error("Error sending OTP");
            },
            onSuccess() {
              router.navigate({
                to: appConfig.authRoutes.verifyOtp,
                search: {
                  email: encodeURIComponent(value.email),
                  type,
                },
              });
              toast.success("OTP sent to email");
            },
          }
        );
      } catch {
        toast.error("Error sending OTP");
      } finally {
        form.reset();
      }
    },
  });

  return (
    <form
      id="email-otp-form"
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
        <form.Subscribe
          selector={(formState) => [
            formState.canSubmit,
            formState.isSubmitting,
          ]}
        >
          {([canSubmit, isSubmitting]) => (
            <Button
              disabled={!canSubmit}
              form="email-otp-form"
              loading={isSubmitting}
              size="sm"
              type="submit"
            >
              Send OTP
            </Button>
          )}
        </form.Subscribe>
      </FieldGroup>
    </form>
  );
}
