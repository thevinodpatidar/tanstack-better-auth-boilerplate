import { IconCheck, IconFlowerFilled } from "@tabler/icons-react";
import { useForm } from "@tanstack/react-form";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { generateId } from "better-auth";
import { toast } from "sonner";
import z from "zod/v3";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import { OrganizationAvatar } from "@/components/ui/organization-avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { TextEllipsis } from "@/components/ui/text-ellipsis";
import { authClient } from "@/lib/auth/auth-client";
import { checkUserOrganizationsQueryOptions } from "@/lib/organization/queries";

const createOrganizationSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }).trim(),
  slug: z
    .string()
    .min(1, { message: "Slug is required" })
    .trim()
    .toLowerCase()
    .regex(/^[a-z0-9-]+$/, {
      message: "Slug must contain only lowercase letters, numbers, and hyphens",
    }),
});

export const Route = createFileRoute("/(app)/onboarding")({
  component: RouteComponent,
  pendingComponent: OnboardingSkeleton,
  loader: async ({ context }) => {
    const hasUserOrganizations = await context.queryClient.ensureQueryData({
      ...checkUserOrganizationsQueryOptions(),
      revalidateIfStale: true,
    });

    if (hasUserOrganizations) {
      throw redirect({ to: "/dashboard" });
    }

    return { hasUserOrganizations };
  },
});

function RouteComponent() {
  const form = useForm({
    defaultValues: { name: "", slug: "" },
    validators: {
      onChange: createOrganizationSchema,
      onSubmit: createOrganizationSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        const { error } = await authClient.organization.create(value);
        if (error) {
          toast.error(error.message || "Error creating organization");
        } else {
          toast.success("Organization created successfully");
        }
      } catch {
        toast.error("Something went wrong");
      }
    },
  });

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Card className="relative w-full max-w-xs sm:max-w-sm">
        <CardHeader className="border-none bg-transparent shadow-xs">
          <div className="flex flex-col items-center text-center">
            <IconFlowerFilled className="size-10" />
            <div className="flex flex-col">
              <CardTitle className="font-semibold text-xl">
                Create your organization
              </CardTitle>
              <CardDescription className="text-muted-foreground text-sm">
                Create your organization to get started
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <form
            id="create-organization-form"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <FieldGroup>
              <form.Subscribe
                children={(state) => (
                  <form.Field name="name">
                    {() => (
                      <div className="flex items-center gap-2">
                        <OrganizationAvatar
                          className="h-10 w-10"
                          orgId={generateId()}
                          orgName={state.values.name}
                        />
                        <div className="flex flex-col">
                          <TextEllipsis width={140}>
                            {state.values.name}
                          </TextEllipsis>
                          <TextEllipsis className="text-xs" width={140}>
                            {state.values.slug}
                          </TextEllipsis>
                        </div>
                      </div>
                    )}
                  </form.Field>
                )}
              />
              <form.Field
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                      <Input
                        aria-invalid={isInvalid}
                        autoComplete="off"
                        id={field.name}
                        name={field.name}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Acme Inc."
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
              <form.Field
                children={(field) => {
                  console.log(field.state);
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
                      {!isInvalid && (
                        <FieldDescription>
                          This is the slug of your organization.
                        </FieldDescription>
                      )}
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
                    return (
                      !data?.status && { message: "Slug is already taken" }
                    );
                  },
                }}
              />
              <form.Subscribe
                selector={(formState) => [
                  formState.canSubmit,
                  formState.isSubmitting,
                ]}
              >
                {([canSubmit, isSubmitting]) => (
                  <Field orientation="horizontal">
                    <Button
                      disabled={isSubmitting}
                      onClick={() => form.reset()}
                      size="sm"
                      type="button"
                      variant="secondary"
                    >
                      Reset
                    </Button>
                    <Button
                      disabled={!canSubmit}
                      form="create-organization-form"
                      loading={isSubmitting}
                      size="sm"
                      type="submit"
                    >
                      Submit
                    </Button>
                  </Field>
                )}
              </form.Subscribe>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

function OnboardingSkeleton() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Card className="relative w-full max-w-xs sm:max-w-sm">
        <CardHeader className="border-none bg-transparent shadow-xs">
          <div className="flex flex-col items-center gap-2 text-center">
            <Skeleton className="size-10" />
            <div className="flex flex-col items-center gap-2">
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="size-12" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
