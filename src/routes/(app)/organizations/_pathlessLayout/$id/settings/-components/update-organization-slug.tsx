import { IconCheck } from "@tabler/icons-react";
import { useForm } from "@tanstack/react-form";
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
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { authClient } from "@/lib/auth/auth-client";

const updateOrganizationSlugSchema = z.object({
  slug: z
    .string()
    .min(1, { message: "Slug is required" })
    .trim()
    .toLowerCase()
    .regex(/^[a-z0-9-]+$/, {
      message: "Slug must contain only lowercase letters, numbers, and hyphens",
    }),
});

export function UpdateOrganizationSlug({ slug }: { slug: string }) {
  const form = useForm({
    defaultValues: { slug },
    validators: {
      onSubmit: updateOrganizationSlugSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        const { error } = await authClient.organization.update({
          data: { slug: value.slug },
        });
        if (error) {
          toast.error(error.message);
        } else {
          toast.success("Organization slug updated successfully");
        }
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <form
      className="space-y-4"
      id="update-organization-slug-form"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Organization Slug</CardTitle>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <form.Field
              children={(field) => {
                const isInvalid =
                  (field.state.meta.isTouched && !field.state.meta.isValid) ||
                  !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Slug</FieldLabel>
                    <InputGroup>
                      <InputGroupInput
                        aria-invalid={isInvalid}
                        id={field.name}
                        name={field.name}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="acme-inc"
                        value={field.state.value}
                      />
                      <InputGroupAddon>
                        <InputGroupText>/organizations/</InputGroupText>
                      </InputGroupAddon>
                      <InputGroupAddon align="inline-end">
                        {field.state.meta.isValidating ? (
                          <Spinner />
                        ) : (
                          <div className="flex size-4 items-center justify-center rounded-full bg-primary text-primary-foreground">
                            <IconCheck className="size-3" />
                          </div>
                        )}
                      </InputGroupAddon>
                    </InputGroup>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
              name="slug"
              validators={{
                onChangeAsyncDebounceMs: 500,
                onChangeAsync: async ({ value }) => {
                  if (value.trim() === "") {
                    return;
                  }
                  const { data } = await authClient.organization.checkSlug({
                    slug: value.trim(),
                  });
                  return !data?.status && { message: "Slug is already taken" };
                },
              }}
            />
          </FieldGroup>
        </CardContent>
        <Separator />
        <CardFooter className="flex flex-row justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            This action will update the slug of the organization.
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
                form="update-organization-slug-form"
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
