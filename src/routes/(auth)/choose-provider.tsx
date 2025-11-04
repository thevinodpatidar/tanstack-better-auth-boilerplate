import { createFileRoute } from "@tanstack/react-router";
import AuthWrapper from "@/components/auth/auth-wrapper";

export const Route = createFileRoute("/(auth)/choose-provider")({
  head: () => ({
    meta: [{ title: "Choose Provider - TanStack + Better Auth Boilerplate" }],
  }),
  component: () => (
    <AuthWrapper
      description="Choose a provider to sign in"
      title="Choose Provider"
      view="choose-provider"
    />
  ),
});
