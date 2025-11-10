import { IconFlowerFilled } from "@tabler/icons-react";
import { Link, parsePathname, useRouter } from "@tanstack/react-router";
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
import { ChooseProvider } from "./choose-provider";
import { EmailOtpForm } from "./email-otp-form";
import { ForgotPasswordForm } from "./forgot-password-form";
import { MagicLinkForm } from "./magic-link-form";
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
    | "choose-provider"
    | "verify-otp"
    | "verify-2fa";
};

export default function AuthWrapper({
  title,
  description,
  view,
}: Readonly<AuthWrapperProps>) {
  const router = useRouter();
  const pathname = parsePathname();

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
      case "choose-provider":
        return <ChooseProvider />;
      case "verify-otp":
        return <VerifyOtpForm />;
      case "verify-2fa":
        return <Verify2FaForm />;
      default:
        return null;
    }
  };

  const isChooseProvider = [
    "/choose-provider",
    "/verify-otp",
    "/verify-2fa",
  ].includes(pathname.join("/"));

  const renderBottomNavigation = () => {
    switch (view) {
      case "choose-provider":
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
            onClick={() => router.navigate({ to: "/" })}
          />
          <CardTitle className="font-semibold text-xl">{title}</CardTitle>
          <CardDescription className="text-muted-foreground text-sm">
            {description}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {renderView()}
        {!isChooseProvider && (
          <>
            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-border after:border-t">
              <span className="relative z-10 bg-card px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
            <Button
              className="w-full"
              onClick={() =>
                router.navigate({ to: appConfig.authRoutes.chooseProvider })
              }
              variant="secondary"
            >
              Choose provider
            </Button>
          </>
        )}
        {renderBottomNavigation()}
      </CardContent>
      <CardFooter className="rounded-b-lg bg-muted p-4">
        <div className="flex flex-col gap-2">
          <div className="text-center text-muted-foreground text-xs">
            By signing up, you agree to our{" "}
            {/* <Link to="/terms-of-use">Terms of Use</Link> and{" "}
            <Link to="/privacy-policy">Privacy Policy</Link>. */}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
