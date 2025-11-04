import { createFileRoute } from "@tanstack/react-router";
import AuthWrapper from "@/components/auth/auth-wrapper";

export const Route = createFileRoute("/(auth)/signin-otp")({
  head: () => ({
    meta: [{ title: "Sign In with OTP - TanStack + Better Auth Boilerplate" }],
  }),
  component: () => (
    <AuthWrapper
      description="Sign in to your account with OTP"
      title="Sign In with OTP"
      view="signin-otp"
    />
  ),
});
