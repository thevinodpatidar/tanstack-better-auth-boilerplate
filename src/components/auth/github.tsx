import { IconBrandGithub } from "@tabler/icons-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { appConfig } from "@/constants/config";
import { authClient } from "@/lib/auth/auth-client";

export function GithubSignInButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    setIsLoading(true);
    try {
      await authClient.signIn.social(
        {
          provider: "github",
          callbackURL: appConfig.authRoutes.onboarding,
        },
        {
          onError: (ctx) => {
            toast.error(ctx.error.message);
          },
        }
      );
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      className="w-full"
      icon={<IconBrandGithub />}
      loading={isLoading}
      onClick={handleSignIn}
      variant="secondary"
    >
      Github
    </Button>
  );
}
