"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useRouter } from "@tanstack/react-router";
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
import { authClient } from "@/lib/auth-client";

const signinSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(MIN_PASSWORD_LENGTH, {
    message: "Password must be at least 8 characters",
  }),
});

type SigninUser = z.infer<typeof signinSchema>;

export function SigninForm() {
  const router = useRouter();
  const form = useForm<SigninUser>({
    resolver: zodResolver(signinSchema),
    defaultValues: { email: "", password: "" },
    mode: "onChange",
  });

  const onSubmit = async (formData: SigninUser) => {
    try {
      await authClient.signIn.email(
        {
          email: formData.email,
          password: formData.password,
          callbackURL: appConfig.authRoutes.onboarding,
        },
        {
          onError: (ctx) => {
            toast.error(ctx.error.message);
          },
          onSuccess: (ctx) => {
            if (ctx.data.twoFactorRedirect) {
              router.navigate({ to: appConfig.authRoutes.verify2fa });
            } else {
              toast.success("Signed in successfully");
            }
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
    <div className="space-y-4">
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
                    <Input
                      {...field}
                      placeholder="m@example.com"
                      type="email"
                    />
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
                  <FormLabel className="flex items-center justify-between">
                    Password
                    <Link
                      className="text-muted-foreground text-sm hover:underline hover:underline-offset-4"
                      to={appConfig.authRoutes.forgotPassword}
                    >
                      Forgot password?
                    </Link>
                  </FormLabel>
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
              Login
            </Button>
          </div>
        </form>
      </Form>
      {/* <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
        <span className="relative z-10 bg-card px-2 text-muted-foreground">
          Or continue with
        </span>
      </div>
      <Button
        variant="secondary"
        className="w-full"
        icon={<IconMail />}
        onClick={() => router.push("/magic-link")}
      >
        Sign in with Magic Link
      </Button>
      <Button
        variant="secondary"
        className="w-full"
        icon={<IconMail />}
        onClick={() => router.push("/signin-otp")}
      >
        Sign in with OTP
      </Button>
      <GoogleSignInButton /> */}
      {/* <div className="text-xs text-center text-muted-foreground">
        <span className="mr-1">Don&apos;t have an account?</span>
        <Link
          href="/signup"
          className="text-primary underline underline-offset-4"
        >
          Sign Up
        </Link>
      </div> */}
    </div>
  );
}
