import { useForm } from "@tanstack/react-form";
import QrCode from "react-qr-code";
import { toast } from "sonner";
import z from "zod";
import { Button } from "@/components/ui/button";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { authClient } from "@/lib/auth/auth-client";

const verifyTwoFactorTOTPSchema = z.object({
  code: z.string().min(6, {
    message: "Code must be 6 digits",
  }),
});

type VerifyTOTPQRCodeProps = {
  secret: string;
};

export default function VerifyTOTPQRCode({ secret }: VerifyTOTPQRCodeProps) {
  const form = useForm({
    defaultValues: { code: "" },
    validators: {
      onChange: verifyTwoFactorTOTPSchema,
      onSubmit: verifyTwoFactorTOTPSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        const { data, error } = await authClient.twoFactor.verifyTotp({
          code: value.code,
          trustDevice: true,
        });
        if (error) {
          toast.error(error.message);
        }
        if (data) {
          toast.success("2FA verified successfully");
        }
      } catch {
        toast.error("Failed to verify 2FA");
      }
    },
  });

  return (
    <>
      <DialogHeader>
        <DialogTitle>Verify two-factor authentication</DialogTitle>
      </DialogHeader>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 text-sm">
          Scan this QR code with your authenticator app Use apps like Google
          Authenticator, Authy, or 1Password to scan the code and link your
          account.
        </div>
        <QrCode value={secret} />
        <Separator />
        <form
          className="space-y-4"
          id="verify-two-factor-totp-form"
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
                    <FieldLabel>Enter the code</FieldLabel>
                    <Input
                      aria-invalid={isInvalid}
                      autoComplete="off"
                      id={field.name}
                      name={field.name}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="123456"
                      type="number"
                      value={field.state.value}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
              name="code"
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
                  form="verify-two-factor-totp-form"
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
      </div>
    </>
  );
}
