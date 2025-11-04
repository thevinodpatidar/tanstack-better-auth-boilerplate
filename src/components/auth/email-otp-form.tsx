"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "@tanstack/react-router";
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
import { appConfig } from "@/constants/config";
import { authClient } from "@/lib/auth-client";

export type EmailOtpType = "sign-in" | "email-verification" | "forget-password";

const emailOtpUserSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
});

type EmailOtpUser = z.infer<typeof emailOtpUserSchema>;

export function EmailOtpForm({ type }: { type: EmailOtpType }) {
  const router = useRouter();
  const form = useForm<EmailOtpUser>({
    resolver: zodResolver(emailOtpUserSchema),
    defaultValues: { email: "" },
    mode: "onChange",
  });

  const onSubmit = async (formData: EmailOtpUser) => {
    try {
      await authClient.emailOtp.sendVerificationOtp(
        { email: formData.email, type },
        {
          onError() {
            toast.error("Error sending OTP");
          },
          onSuccess() {
            router.navigate({
              to: appConfig.authRoutes.verifyOtp,
              params: { email: formData.email, type },
            });
            toast.success("OTP sent to email");
          },
        }
      );
    } catch {
      toast.error("Error sending OTP");
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
          <Button
            className="w-full"
            loading={form.formState.isSubmitting}
            type="submit"
          >
            Send OTP
          </Button>
        </div>
      </form>
    </Form>
  );
}
