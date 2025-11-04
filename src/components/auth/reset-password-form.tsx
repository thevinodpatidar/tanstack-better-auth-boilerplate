"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { getRouteApi, useRouter } from "@tanstack/react-router";
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
import { appConfig, MIN_PASSWORD_LENGTH } from "@/constants/config";
import { authClient } from "@/lib/auth/auth-client";

const resetPasswordUserSchema = z.object({
  password: z.string().min(MIN_PASSWORD_LENGTH, {
    message: "Password must be at least 8 characters",
  }),
});

type ResetPasswordUser = z.infer<typeof resetPasswordUserSchema>;

export function ResetPasswordForm() {
  const route = getRouteApi("/(auth)/reset-password");

  const router = useRouter();
  const searchParams = route.useSearch();
  const token = searchParams.token;

  if (!token) {
    toast.error("Invalid token");
    router.navigate({ to: appConfig.authRoutes.signin });
  }

  const form = useForm<ResetPasswordUser>({
    resolver: zodResolver(resetPasswordUserSchema),
    defaultValues: { password: "" },
    mode: "onChange",
  });

  const onSubmit = async (formData: ResetPasswordUser) => {
    try {
      const { error } = await authClient.resetPassword({
        newPassword: formData.password,
        token: token as string,
      });
      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Password reset successfully");
        router.navigate({ to: appConfig.authRoutes.signin });
      }
    } catch {
      toast.error("Error resetting password");
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
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
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
            Reset password
          </Button>
        </div>
      </form>
    </Form>
  );
}
