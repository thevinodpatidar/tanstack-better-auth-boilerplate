import { createFileRoute } from "@tanstack/react-router";
import AuthWrapper from "@/components/auth/auth-wrapper";

export const Route = createFileRoute("/(auth)/forgot-password")({
  head: () => ({
    meta: [{ title: "Forgot Password - TanStack + Better Auth Boilerplate" }],
  }),
  component: () => (
    <AuthWrapper
      description="Forgot your password? No problem."
      title="Forgot Password"
      view="forgot-password"
    />
  ),
});
