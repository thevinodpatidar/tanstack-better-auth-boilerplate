import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { z } from "zod";
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

const updateOrganizationNameSchema = z.object({
  name: z.string().min(1),
});

export function UpdateOrganizationName({ name }: { name: string }) {
  const form = useForm({
    defaultValues: {
      name,
    },
    validators: {
      onSubmit: updateOrganizationNameSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        const { error } = await authClient.organization.update({
          data: { name: value.name },
        });
        if (error) {
          toast.error(error.message);
        } else {
          toast.success("Organization name updated successfully");
        }
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <form
      className="space-y-4"
      id="update-organization-name-form"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Organization Name</CardTitle>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <form.Field
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel>Name</FieldLabel>
                    <Input
                      aria-invalid={isInvalid}
                      autoComplete="off"
                      id={field.name}
                      name={field.name}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Acme Inc."
                      type="text"
                      value={field.state.value}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
              name="name"
            />
          </FieldGroup>
        </CardContent>
        <Separator />
        <CardFooter className="flex flex-row justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            This action will update the name of the organization.
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
                form="update-organization-name-form"
                loading={isSubmitting}
                size="sm"
                type="submit"
              >
                Update
              </Button>
            )}
          </form.Subscribe>
        </CardFooter>
      </Card>
    </form>
  );
}
