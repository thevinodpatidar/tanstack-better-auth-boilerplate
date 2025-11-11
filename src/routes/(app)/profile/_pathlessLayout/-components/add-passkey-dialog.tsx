import { useForm } from "@tanstack/react-form";
import { useState } from "react";
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
import { addPasskeyMutationOptions } from "@/lib/users/mutations";

const addPasskeySchema = z.object({
  name: z.string().min(1, "Name is required"),
});

export default function AddPasskeyDialog() {
  const [open, setOpen] = useState(false);
  const { mutateAsync } = addPasskeyMutationOptions();

  const form = useForm({
    defaultValues: { name: "" },
    validators: {
      onChange: addPasskeySchema,
      onSubmit: addPasskeySchema,
    },
    onSubmit: async ({ value }) => {
      try {
        await mutateAsync({ name: value.name });
      } catch {
        toast.error("Failed to add passkey");
      } finally {
        form.reset();
        setOpen(false);
      }
    },
  });

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button>Add passkey</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add passkey</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Passkeys are a secure and easy way to access your account.
        </DialogDescription>
        <form
          className="space-y-4"
          id="add-passkey-form"
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
                    <FieldLabel>Enter your passkey name</FieldLabel>
                    <Input
                      aria-invalid={isInvalid}
                      autoComplete="off"
                      id={field.name}
                      name={field.name}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="My passkey"
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
                  form="add-passkey-form"
                  loading={isSubmitting}
                  size="sm"
                  type="submit"
                >
                  Add passkey
                </Button>
              )}
            </form.Subscribe>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}
