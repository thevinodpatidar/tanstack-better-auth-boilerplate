import { createFileRoute } from "@tanstack/react-router";
import AuthWrapper from "@/components/auth/auth-wrapper";

export const Route = createFileRoute("/(auth)/signin")({
  head: () => ({
    meta: [{ title: "Sign In - TanStack + Better Auth Boilerplate" }],
  }),
  component: () => (
    <AuthWrapper
      description="Sign in to your account to continue."
      title="Sign in"
      view="signin"
    />
  ),
});
