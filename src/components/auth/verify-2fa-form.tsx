import { useForm } from "@tanstack/react-form";
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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { appConfig, OTP_LENGTH } from "@/constants/config";
import { authClient } from "@/lib/auth/auth-client";

const verify2FaUserSchema = z.object({
  otp: z.string().min(OTP_LENGTH, { message: "OTP must be 6 digits" }),
});

export function Verify2FaForm() {
  const form = useForm({
    defaultValues: { otp: "" },
    validators: {
      onChange: verify2FaUserSchema,
      onSubmit: verify2FaUserSchema,
    },
    onSubmit: async ({ value }) => {
      console.log(value);
      try {
        const { data, error } = await authClient.twoFactor.verifyTotp({
          code: value.otp,
          trustDevice: true,
        });
        if (error) {
          toast.error(error.message);
        }
        if (data) {
          window.location.href = appConfig.authRoutes.onboarding;
          toast.success("Code verified successfully");
        }
      } catch {
        toast.error("Error verifying code");
      } finally {
        form.reset();
      }
    },
  });

  return (
    <form
      id="verify-2fa-form"
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
              form="verify-2fa-form"
              loading={isSubmitting}
              size="sm"
              type="submit"
            >
              Verify 2FA Code
            </Button>
          )}
        </form.Subscribe>
      </FieldGroup>
    </form>
  );
}
