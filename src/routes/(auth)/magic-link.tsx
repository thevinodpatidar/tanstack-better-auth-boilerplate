import { createFileRoute } from "@tanstack/react-router";
import AuthWrapper from "@/components/auth/auth-wrapper";

export const Route = createFileRoute("/(auth)/magic-link")({
  head: () => ({
    meta: [{ title: "Magic Link - TanStack + Better Auth Boilerplate" }],
  }),
  component: () => (
    <AuthWrapper
      description="Enter your email to receive a magic link."
      title="Magic Link"
      view="magic-link"
    />
  ),
});
