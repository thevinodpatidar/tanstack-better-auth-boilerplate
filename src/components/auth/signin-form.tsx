import { useForm } from "@tanstack/react-form";
import { Link } from "@tanstack/react-router";
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

const signinSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
  password: z.string().min(MIN_PASSWORD_LENGTH, {
    message: "Password must be at least 8 characters",
  }),
});

export function SigninForm() {
  const form = useForm({
    defaultValues: { email: "", password: "" },
    validators: {
      onChange: signinSchema,
      onSubmit: signinSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        await authClient.signIn.email(
          {
            email: value.email,
            password: value.password,
            callbackURL: appConfig.authRoutes.onboarding,
          },
          {
            onError: (ctx) => {
              toast.error(ctx.error.message);
            },
            onSuccess: (ctx) => {
              if (ctx.data.twoFactorRedirect) {
                window.location.href = appConfig.authRoutes.verify2fa;
              } else {
                toast.success("Signed in successfully");
              }
            },
          }
        );
      } catch {
        toast.error("Error signing in");
      } finally {
        form.reset();
      }
    },
  });

  return (
    <form
      id="signin-form"
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
              <Field data-invalid={isInvalid}>
                <FieldLabel
                  className="flex justify-between gap-2"
                  htmlFor={field.name}
                >
                  Password
                  <Link
                    className="text-muted-foreground text-sm"
                    to="/forgot-password"
                  >
                    Forgot password?
                  </Link>
                </FieldLabel>
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
              form="signin-form"
              loading={isSubmitting}
              size="sm"
              type="submit"
            >
              Sign in
            </Button>
          )}
        </form.Subscribe>
      </FieldGroup>
    </form>
  );
}
