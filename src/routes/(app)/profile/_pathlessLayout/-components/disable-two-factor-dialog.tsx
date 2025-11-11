import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import z from "zod";
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
import { authClient } from "@/lib/auth/auth-client";

const disableTwoFactorSchema = z.object({
  password: z.string().min(8, {
    message: "Password must be at least 8 characters",
  }),
});

export default function DisableTwoFactorDialog() {
  const form = useForm({
    defaultValues: {
      password: "",
    },
    validators: {
      onChange: disableTwoFactorSchema,
      onSubmit: disableTwoFactorSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        const { data, error } = await authClient.twoFactor.disable({
          password: value.password,
        });
        if (error) {
          toast.error(error.message);
        }
        if (data) {
          toast.success("2FA disabled successfully");
        }
      } catch {
        toast.error("Failed to disable 2FA");
      } finally {
        form.reset();
      }
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Disable 2FA</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Disable two-factor authentication</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Two-factor authentication adds an extra layer of security to your
          account by requiring a code from an authenticator app in addition to
          your password.
        </DialogDescription>
        <form
          className="space-y-4"
          id="disable-two-factor-form"
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
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
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
                  form="disable-two-factor-form"
                  loading={isSubmitting}
                  size="sm"
                  type="submit"
                >
                  Disable 2FA
                </Button>
              )}
            </form.Subscribe>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}
