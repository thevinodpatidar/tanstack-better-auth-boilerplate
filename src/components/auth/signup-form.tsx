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
import {
  appConfig,
  HTTP_STATUS_CODES,
  MIN_PASSWORD_LENGTH,
} from "@/constants/config";
import { authClient } from "@/lib/auth/auth-client";

const signupSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
  password: z.string().min(MIN_PASSWORD_LENGTH, {
    message: "Password must be at least 8 characters",
  }),
  name: z.string().min(1, { message: "Name is required" }),
});

export function SignupForm() {
  const form = useForm({
    defaultValues: { email: "", password: "", name: "" },
    validators: {
      onChange: signupSchema,
      onSubmit: signupSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        await authClient.signUp.email(
          {
            email: value.email,
            password: value.password,
            name: value.name,
            callbackURL: appConfig.authRoutes.onboarding,
          },
          {
            onError: (ctx) => {
              if (ctx.error.status === HTTP_STATUS_CODES.FORBIDDEN) {
                toast.error("Please verify your email address");
              }
              toast.error(ctx.error.message);
            },
            onSuccess: () => {
              toast.success("Verification email sent");
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
      id="signup-form"
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
                <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                <Input
                  aria-invalid={isInvalid}
                  id={field.name}
                  name={field.name}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="John Doe"
                  type="text"
                  value={field.state.value}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
          name="name"
        />
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
        <form.Subscribe
          selector={(formState) => [
            formState.canSubmit,
            formState.isSubmitting,
          ]}
        >
          {([canSubmit, isSubmitting]) => (
            <Button
              disabled={!canSubmit}
              form="signup-form"
              loading={isSubmitting}
              size="sm"
              type="submit"
            >
              Create account
            </Button>
          )}
        </form.Subscribe>
      </FieldGroup>
    </form>
  );
}
