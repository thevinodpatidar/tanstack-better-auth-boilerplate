"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { getRouteApi, Link, useRouter } from "@tanstack/react-router";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { appConfig, MIN_PASSWORD_LENGTH, OTP_LENGTH } from "@/constants/config";
import { authClient } from "@/lib/auth/auth-client";
import { cn } from "@/lib/utils";
import type { EmailOtpType } from "./email-otp-form";

const verifyOtpUserSchema = z.object({
  otp: z.string().min(OTP_LENGTH, { message: "OTP must be 6 digits" }),
  password: z
    .string()
    .min(MIN_PASSWORD_LENGTH, {
      message: "Password must be at least 8 characters",
    })
    .optional(),
});

type VerifyOtpUser = z.infer<typeof verifyOtpUserSchema>;

export function VerifyOtpForm() {
  const route = getRouteApi("/(auth)/verify-otp");
  const router = useRouter();
  const searchParams = route.useSearch();
  const encodedEmail = searchParams.email;
  const email = encodedEmail ? decodeURIComponent(encodedEmail) : "";
  const type = searchParams.type as EmailOtpType;

  const form = useForm<VerifyOtpUser>({
    resolver: zodResolver(verifyOtpUserSchema),
    defaultValues: { otp: "", password: undefined },
    mode: "onChange",
  });

  const onSubmit = async (formData: VerifyOtpUser) => {
    try {
      if (type === "sign-in") {
        await authClient.signIn.emailOtp(
          {
            otp: formData.otp,
            email: email ?? "",
          },
          {
            onError: (ctx) => {
              toast.error(ctx.error.message);
            },
            onSuccess: () => {
              router.navigate({ to: appConfig.authRoutes.onboarding });
              toast.success("Signed in successfully");
            },
          }
        );
      } else if (type === "email-verification") {
        await authClient.emailOtp.verifyEmail(
          {
            otp: formData.otp,
            email: email ?? "",
          },
          {
            onError: (ctx) => {
              toast.error(ctx.error.message);
            },
            onSuccess: () => {
              router.navigate({ to: appConfig.authRoutes.onboarding });
              toast.success("Email verified successfully");
            },
          }
        );
      } else if (type === "forget-password") {
        await authClient.emailOtp.resetPassword(
          {
            otp: formData.otp,
            email: email ?? "",
            password: formData.password ?? "",
          },
          {
            onError: (ctx) => {
              toast.error(ctx.error.message);
            },
            onSuccess: () => {
              router.navigate({ to: appConfig.authRoutes.signin });
              toast.success("Password reset successfully");
            },
          }
        );
      }
    } catch {
      toast.error("Error sending OTP");
    } finally {
      form.reset();
    }
  };

  if (
    !(
      email &&
      type &&
      ["sign-in", "email-verification", "forget-password"].includes(type)
    )
  ) {
    return (
      <div className="flex items-center justify-center">
        <div className="text-muted-foreground text-sm">
          <p>
            Something went wrong. Please go to{" "}
            <Link className="text-blue-500" to={appConfig.authRoutes.signin}>
              sign in
            </Link>
            .
          </p>
        </div>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4">
          {type === "forget-password" && (
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem
                className={cn(
                  type === "sign-in" && "flex flex-col items-center"
                )}
              >
                {type !== "sign-in" && <FormLabel>OTP</FormLabel>}
                <FormControl>
                  <InputOTP
                    maxLength={6}
                    {...field}
                    pattern={REGEXP_ONLY_DIGITS}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormDescription
                  className={cn(
                    type === "sign-in" &&
                      "text-center text-muted-foreground text-sm"
                  )}
                >
                  Please enter the one-time password sent to your email.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="w-full"
            loading={form.formState.isSubmitting}
            type="submit"
          >
            Verify OTP
          </Button>
        </div>
      </form>
    </Form>
  );
}
