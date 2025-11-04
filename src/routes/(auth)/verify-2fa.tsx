import { createFileRoute } from "@tanstack/react-router";
import AuthWrapper from "@/components/auth/auth-wrapper";

export const Route = createFileRoute("/(auth)/verify-2fa")({
  head: () => ({
    meta: [{ title: "Verify 2FA - TanStack + Better Auth Boilerplate" }],
  }),
  component: () => (
    <AuthWrapper
      description="Verify your 2FA code"
      title="Verify 2FA"
      view="verify-2fa"
    />
  ),
});
