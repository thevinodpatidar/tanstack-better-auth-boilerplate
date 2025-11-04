import { createFileRoute } from "@tanstack/react-router";
import AuthWrapper from "@/components/auth/auth-wrapper";

export const Route = createFileRoute("/(auth)/signup")({
  head: () => ({
    meta: [{ title: "Sign Up - TanStack + Better Auth Boilerplate" }],
  }),
  component: () => (
    <AuthWrapper
      description="Sign up for a new account."
      title="Sign Up"
      view="signup"
    />
  ),
});
