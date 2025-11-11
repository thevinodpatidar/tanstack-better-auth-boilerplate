import { useForm } from "@tanstack/react-form";
import { getRouteApi, Link } from "@tanstack/react-router";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { appConfig, MIN_PASSWORD_LENGTH, OTP_LENGTH } from "@/constants/config";
import { authClient } from "@/lib/auth/auth-client";
import type { EmailOtpType } from "./email-otp-form";

const verifyOtpUserSchema = z.object({
  otp: z.string().min(OTP_LENGTH, { message: "OTP must be 6 digits" }),
  password: z.string().min(MIN_PASSWORD_LENGTH, {
    message: "Password must be at least 8 characters",
  }),
});

export function VerifyOtpForm() {
  const route = getRouteApi("/(auth)/verify-otp");
  const searchParams = route.useSearch();
  const encodedEmail = searchParams.email;
  const email = encodedEmail ? decodeURIComponent(encodedEmail) : "";
  const type = searchParams.type as EmailOtpType;

  const form = useForm({
    defaultValues: { otp: "", password: "" },
    validators: {
      onChange: verifyOtpUserSchema,
      onSubmit: verifyOtpUserSchema,
    },
    onSubmit: async ({
      value,
    }: {
      value: { otp: string; password: string };
    }) => {
      try {
        if (type === "sign-in") {
          await authClient.signIn.emailOtp(
            {
              otp: value.otp,
              email: email ?? "",
            },
            {
              onError: (ctx) => {
                toast.error(ctx.error.message);
              },
              onSuccess: () => {
                window.location.href = appConfig.authRoutes.onboarding;
                toast.success("Signed in successfully");
              },
            }
          );
        } else if (type === "email-verification") {
          await authClient.emailOtp.verifyEmail(
            {
              otp: value.otp,
              email: email ?? "",
            },
            {
              onError: (ctx) => {
                toast.error(ctx.error.message);
              },
              onSuccess: () => {
                window.location.href = appConfig.authRoutes.onboarding;
                toast.success("Email verified successfully");
              },
            }
          );
        } else if (type === "forget-password") {
          await authClient.emailOtp.resetPassword(
            {
              otp: value.otp,
              email: email ?? "",
              password: value.password,
            },
            {
              onError: (ctx) => {
                toast.error(ctx.error.message);
              },
              onSuccess: () => {
                window.location.href = appConfig.authRoutes.signin;
                toast.success("Password reset successfully");
              },
            }
          );
        }
      } catch {
        toast.error("Error sending OTP");
      } finally {
        form.reset();
      }
    },
  });

  if (
    !(
      email &&
      type &&
      ["sign-in", "email-verification", "forget-password"].includes(type)
    )
  ) {
    return (
      <div className="flex items-center justify-center">
        <div className="text-muted-foreground text-sm">
          <p>
            Something went wrong. Please go to{" "}
            <Link className="text-blue-500" to={appConfig.authRoutes.signin}>
              sign in
            </Link>
            .
          </p>
        </div>
      </div>
    );
  }

  return (
    <form
      id="verify-otp-form"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <FieldGroup className="gap-4">
        {type === "forget-password" && (
          <form.Field
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Password</FieldLabel>
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
        )}
        <form.Field
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>OTP</FieldLabel>
                <InputOTP
                  aria-invalid={isInvalid}
                  id={field.name}
                  maxLength={6}
                  name={field.name}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e)}
                  pattern={REGEXP_ONLY_DIGITS}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
                <FieldDescription className="text-muted-foreground text-sm">
                  Please enter the one-time password from your authenticator
                  app.
                </FieldDescription>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
          name="otp"
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
              form="verify-otp-form"
              loading={isSubmitting}
              size="sm"
              type="submit"
            >
              Verify OTP
            </Button>
          )}
        </form.Subscribe>
      </FieldGroup>
    </form>
  );
}
