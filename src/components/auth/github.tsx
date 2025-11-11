import { IconBrandGithub } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { appConfig } from "@/constants/config";
import { authClient } from "@/lib/auth/auth-client";

export function GithubSignInButton() {
  const { mutate: signInWithGithub, isPending: isSigningInWithGithub } =
    useMutation({
      mutationKey: ["github-sign-in"],
      mutationFn: async () => {
        await authClient.signIn.social({
          provider: "github",
          callbackURL: appConfig.authRoutes.onboarding,
        });
      },
      onSuccess: () => {
        toast.success("Signed in with GitHub");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          icon={<IconBrandGithub />}
          loading={isSigningInWithGithub}
          onClick={() => signInWithGithub()}
          variant="secondary"
        />
      </TooltipTrigger>
      <TooltipContent>GitHub</TooltipContent>
    </Tooltip>
  );
}
