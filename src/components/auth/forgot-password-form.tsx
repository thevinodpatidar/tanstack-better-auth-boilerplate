import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { appConfig } from "@/constants/config";
import { authClient } from "@/lib/auth/auth-client";

const forgotPasswordUserSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  sendEmailOTP: z.boolean().optional(),
});

type ForgotPasswordUser = z.infer<typeof forgotPasswordUserSchema>;

export function ForgotPasswordForm() {
  const router = useRouter();
  const form = useForm<ForgotPasswordUser>({
    resolver: zodResolver(forgotPasswordUserSchema),
    defaultValues: { email: "", sendEmailOTP: false },
    mode: "onChange",
  });

  const onSubmit = async (formData: ForgotPasswordUser) => {
    try {
      if (formData.sendEmailOTP) {
        const { error } = await authClient.emailOtp.sendVerificationOtp({
          email: formData.email,
          type: "forget-password",
        });
        if (error) {
          toast.error(error.message);
        } else {
          toast.success("OTP sent to your email");
          router.navigate({
            to: appConfig.authRoutes.verifyOtp,
            search: {
              email: encodeURIComponent(formData.email),
              type: "forget-password",
            },
          });
        }
      } else {
        const { error } = await authClient.forgetPassword({
          email: formData.email,
          redirectTo: appConfig.authRoutes.resetPassword,
        });
        if (error) {
          toast.error(error.message);
        } else {
          toast.success("Password reset link sent to email");
        }
      }
    } catch {
      toast.error("Oops! Something broke on our end");
    } finally {
      form.reset();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4">
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
            name="sendEmailOTP"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Send email OTP</FormLabel>
                  <FormDescription>
                    We will send a one-time password to reset your password.
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
          <Button
            className="w-full"
            loading={form.formState.isSubmitting}
            type="submit"
          >
            {form.watch("sendEmailOTP") ? "Send email OTP" : "Send reset link"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
