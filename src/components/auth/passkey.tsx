import { useMutation } from "@tanstack/react-query";
import { FingerprintIcon } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { appConfig } from "@/constants/config";
import { authClient } from "@/lib/auth/auth-client";

export function PasskeySignInButton() {
  const { mutate: signInWithPasskey, isPending: isSigningInWithPasskey } =
    useMutation({
      mutationKey: ["passkey-sign-in"],
      mutationFn: async () => {
        await authClient.signIn.passkey({
          fetchOptions: {
            onSuccess: () => {
              toast.success("Signed in with passkey");
              window.location.href = appConfig.authRoutes.onboarding;
            },
            onError: (ctx) => {
              toast.error(ctx.error.message);
            },
          },
        });
      },
    });

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          icon={<FingerprintIcon />}
          loading={isSigningInWithPasskey}
          onClick={() => signInWithPasskey()}
          variant="secondary"
        />
      </TooltipTrigger>
      <TooltipContent>Passkey</TooltipContent>
    </Tooltip>
  );
}
