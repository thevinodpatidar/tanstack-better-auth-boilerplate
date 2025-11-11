import { useForm } from "@tanstack/react-form";
import { useQueryClient } from "@tanstack/react-query";
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
import { setPasswordMutationOptions } from "@/lib/users/mutations";
import { listLinkedAccountsQueryOptions } from "@/lib/users/queries";

const setPasswordSchema = z.object({
  password: z.string().min(8, {
    message: "Password must be at least 8 characters",
  }),
});

export default function SetPassword() {
  const queryClient = useQueryClient();
  const { mutateAsync } = setPasswordMutationOptions();

  const form = useForm({
    defaultValues: { password: "" },
    validators: { onSubmit: setPasswordSchema },
    onSubmit: async ({ value }) => {
      try {
        await mutateAsync(value.password);
        toast.success("Password set successfully");
        queryClient.invalidateQueries({
          queryKey: listLinkedAccountsQueryOptions().queryKey,
        });
      } catch {
        toast.error("Failed to set password");
      }
    },
  });
  return (
    <div className="flex h-full flex-col gap-4">
      <form
        className="space-y-4"
        id="set-password-form"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Set Password</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
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
            </FieldGroup>
          </CardContent>
          <Separator />
          <CardFooter className="flex flex-row justify-between gap-4">
            <p className="text-muted-foreground text-sm">
              This action will set the password of the user.
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
                  form="set-password-form"
                  loading={isSubmitting}
                  size="sm"
                  type="submit"
                >
                  Set password
                </Button>
              )}
            </form.Subscribe>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
