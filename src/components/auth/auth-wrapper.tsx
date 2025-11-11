import { IconDialpadFilled, IconFlowerFilled } from "@tabler/icons-react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Link2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { appConfig } from "@/constants/config";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { EmailOtpForm } from "./email-otp-form";
import { ForgotPasswordForm } from "./forgot-password-form";
import { GithubSignInButton } from "./github";
import { GoogleSignInButton } from "./google";
import { MagicLinkForm } from "./magic-link-form";
import { PasskeySignInButton } from "./passkey";
import { ResetPasswordForm } from "./reset-password-form";
import { SigninForm } from "./signin-form";
import { SignupForm } from "./signup-form";
import { Verify2FaForm } from "./verify-2fa-form";
import { VerifyOtpForm } from "./verify-otp-form";

type AuthWrapperProps = {
  title: string;
  description: string;
  view:
    | "signin"
    | "signup"
    | "magic-link"
    | "forgot-password"
    | "reset-password"
    | "signin-otp"
    | "verify-otp"
    | "verify-2fa";
};

export default function AuthWrapper({
  title,
  description,
  view,
}: Readonly<AuthWrapperProps>) {
  const navigate = useNavigate();

  const renderView = () => {
    switch (view) {
      case "signin":
        return <SigninForm />;
      case "signup":
        return <SignupForm />;
      case "magic-link":
        return <MagicLinkForm />;
      case "forgot-password":
        return <ForgotPasswordForm />;
      case "reset-password":
        return <ResetPasswordForm />;
      case "signin-otp":
        return <EmailOtpForm type="sign-in" />;
      case "verify-otp":
        return <VerifyOtpForm />;
      case "verify-2fa":
        return <Verify2FaForm />;
      default:
        return null;
    }
  };

  const renderBottomNavigation = () => {
    switch (view) {
      case "forgot-password":
      case "reset-password":
      case "signin-otp":
      case "magic-link":
      case "verify-otp":
      case "verify-2fa":
        return (
          <div className="text-center text-muted-foreground text-xs">
            <Link
              className="text-primary underline underline-offset-4"
              to={appConfig.authRoutes.signin}
            >
              Go back
            </Link>
          </div>
        );
      case "signin":
        return (
          <div className="text-center text-muted-foreground text-xs">
            <span className="mr-1">Don&apos;t have an account?</span>
            <Link
              className="text-primary underline underline-offset-4"
              to={appConfig.authRoutes.signup}
            >
              Sign Up
            </Link>
          </div>
        );
      case "signup":
        return (
          <div className="text-center text-muted-foreground text-xs">
            <span className="mr-1">Already have an account?</span>
            <Link
              className="text-primary underline underline-offset-4"
              to={appConfig.authRoutes.signin}
            >
              Sign in
            </Link>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="relative w-full max-w-xs pb-0 sm:max-w-sm">
      <CardHeader className="border-none bg-transparent shadow-xs">
        <div className="flex flex-col items-center gap-2 text-center">
          <IconFlowerFilled
            className="size-10 cursor-pointer"
            onClick={() => navigate({ to: "/" })}
          />
          <CardTitle className="font-semibold text-xl">{title}</CardTitle>
          <CardDescription className="text-muted-foreground text-sm">
            {description}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {renderView()}
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-border after:border-t">
          <span className="relative z-10 bg-card px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                icon={<Link2Icon />}
                onClick={() => navigate({ to: appConfig.authRoutes.magicLink })}
                variant="secondary"
              />
            </TooltipTrigger>
            <TooltipContent>Magic Link</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                icon={<IconDialpadFilled />}
                onClick={() =>
                  navigate({ to: appConfig.authRoutes.signinWithOtp })
                }
                variant="secondary"
              />
            </TooltipTrigger>
            <TooltipContent>One-time password</TooltipContent>
          </Tooltip>

          <GoogleSignInButton />
          <GithubSignInButton />
          <PasskeySignInButton />
        </div>
        {renderBottomNavigation()}
      </CardContent>
      <CardFooter className="flex justify-center rounded-b-lg bg-muted p-4">
        <div className="flex flex-col gap-2">
          <div className="text-center text-muted-foreground text-xs">
            By signing up, you agree to our policy.{" "}
            {/* <Link to="/terms-of-use">Terms of Use</Link> and{" "}
            <Link to="/privacy-policy">Privacy Policy</Link>. */}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
