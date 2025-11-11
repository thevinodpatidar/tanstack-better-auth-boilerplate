import { useForm } from "@tanstack/react-form";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { authClient } from "@/lib/auth/auth-client";

const dangerZoneSchema = z.object({
  password: z.string().min(1, "Password is required"),
});

export const Route = createFileRoute(
  "/(app)/profile/_pathlessLayout/danger-zone"
)({
  component: RouteComponent,
});

function RouteComponent() {
  const form = useForm({
    defaultValues: {
      password: "",
    },
    validators: {
      onSubmit: dangerZoneSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        const { error } = await authClient.deleteUser({
          password: value.password,
          callbackURL: "/signin",
        });
        if (error) {
          toast.error(error.message);
        } else {
          toast.success("Account deleted successfully");
        }
      } catch (error) {
        console.error(error);
      } finally {
        form.reset();
      }
    },
  });

  return (
    <form
      id="danger-zone-form"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-destructive">Delete Account</CardTitle>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <form.Field
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel>Enter your password</FieldLabel>
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
          </FieldGroup>
        </CardContent>
        <Separator />
        <CardFooter className="flex flex-row justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            This action will delete your account and all of your data, this
            action is irreversible.
          </p>
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
                form="danger-zone-form"
                loading={isSubmitting}
                size="sm"
                type="submit"
              >
                Delete Account
              </Button>
            )}
          </form.Subscribe>
        </CardFooter>
      </Card>
    </form>
  );
}
