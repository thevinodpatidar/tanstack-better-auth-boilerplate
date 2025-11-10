import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  appConfig,
  HTTP_STATUS_CODES,
  MIN_PASSWORD_LENGTH,
} from "@/constants/config";
import { authClient } from "@/lib/auth/auth-client";

const passwordSignupSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
  password: z.string().min(MIN_PASSWORD_LENGTH, {
    message: "Password must be at least 8 characters",
  }),
  name: z.string().min(1, { message: "Name is required" }),
});

type PasswordSignupUser = z.infer<typeof passwordSignupSchema>;

export function SignupForm() {
  const form = useForm<PasswordSignupUser>({
    resolver: zodResolver(passwordSignupSchema),
    defaultValues: { email: "", password: "", name: "" },
    mode: "onChange",
  });

  const onSubmit = async (formData: PasswordSignupUser) => {
    try {
      await authClient.signUp.email(
        {
          email: formData.email,
          password: formData.password,
          name: formData.name,
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
  };

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="John Doe" type="text" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} placeholder="m@example.com" type="email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input {...field} placeholder="********" type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="w-full"
          loading={form.formState.isSubmitting}
          type="submit"
        >
          Create an account
        </Button>
      </form>
    </Form>
  );
}
