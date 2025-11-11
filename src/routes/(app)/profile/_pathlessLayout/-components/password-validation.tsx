import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import z from "zod";
import { Button } from "@/components/ui/button";
import {
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
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth/auth-client";

const enableTwoFactorSchema = z.object({
  password: z.string().min(8, {
    message: "Password must be at least 8 characters",
  }),
});

type PasswordValidationProps = {
  onEnable2FA: (data: { totpURI: string; backupCodes: string[] }) => void;
};

export default function PasswordValidation({
  onEnable2FA,
}: PasswordValidationProps) {
  const form = useForm({
    defaultValues: { password: "" },
    validators: {
      onChange: enableTwoFactorSchema,
      onSubmit: enableTwoFactorSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        const { data, error } = await authClient.twoFactor.enable({
          password: value.password,
        });

        if (error) {
          toast.error(error.message);
        }
        if (data) {
          toast.success("2FA enabled successfully");
          onEnable2FA(data);
        }
      } catch {
        toast.error("Failed to enable 2FA");
      }
    },
  });

  return (
    <>
      <DialogHeader>
        <DialogTitle>Enable two-factor authentication</DialogTitle>
      </DialogHeader>
      <DialogDescription>
        Two-factor authentication adds an extra layer of security to your
        account by requiring a code from an authenticator app in addition to
        your password.
      </DialogDescription>
      <form
        className="space-y-4"
        id="password-validation-form"
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
                className="w-fit self-end"
                disabled={!canSubmit}
                form="password-validation-form"
                loading={isSubmitting}
                size="sm"
                type="submit"
              >
                Verify password
              </Button>
            )}
          </form.Subscribe>
        </FieldGroup>
      </form>
    </>
  );
}
