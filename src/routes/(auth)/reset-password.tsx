import { createFileRoute } from "@tanstack/react-router";
import z from "zod";
import AuthWrapper from "@/components/auth/auth-wrapper";

const resetPasswordUserSchema = z.object({
  token: z.string().min(1, { message: "Token is required" }),
});

export const Route = createFileRoute("/(auth)/reset-password")({
  head: () => ({
    meta: [{ title: "Reset Password - TanStack + Better Auth Boilerplate" }],
  }),
  component: () => (
    <AuthWrapper
      description="Reset your password"
      title="Reset Password"
      view="reset-password"
    />
  ),
  validateSearch: resetPasswordUserSchema,
});
