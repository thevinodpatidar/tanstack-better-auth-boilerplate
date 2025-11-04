import { createFileRoute } from "@tanstack/react-router";
import z from "zod";
import AuthWrapper from "@/components/auth/auth-wrapper";

const verifyOtpUserSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
  type: z
    .enum(["sign-in", "email-verification", "forget-password"])
    .catch("sign-in"),
});

export const Route = createFileRoute("/(auth)/verify-otp")({
  component: () => (
    <AuthWrapper
      description="Verify your OTP code"
      title="Verify OTP"
      view="verify-otp"
    />
  ),
  validateSearch: verifyOtpUserSchema,
});
