import { useForm } from "@tanstack/react-form";
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

const magicLinkUserSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
});

export function MagicLinkForm() {

  const form = useForm({
    defaultValues: { email: "" },
    validators: {
      onChange: magicLinkUserSchema,
      onSubmit: magicLinkUserSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        const { error } = await authClient.signIn.magicLink({
          email: value.email,
          callbackURL: appConfig.authRoutes.onboarding,
        });
        if (error) {
          toast.error(error.message);
        } else {
          toast.success("Magic link sent to email");
        }
      } catch {
        toast.error("Error signing in");
      } finally {
        form.reset();
      }
    },
  });

  return (
    <form
      id="magic-link-form"
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
              form="magic-link-form"
              loading={isSubmitting}
              size="sm"
              type="submit"
            >
              Send Magic Link
            </Button>
          )}
        </form.Subscribe>
      </FieldGroup>
    </form>
  );
}
