"use client";

import { IconKey, IconMail } from "@tabler/icons-react";
import { useRouter } from "@tanstack/react-router";
import { useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { appConfig } from "@/constants/config";
import { authClient } from "@/lib/auth/auth-client";
import { GithubSignInButton } from "./github";
import { GoogleSignInButton } from "./google";

export function ChooseProvider() {
  const router = useRouter();

  useEffect(() => {
    if (
      !(PublicKeyCredential.isConditionalMediationAvailable
        ? PublicKeyCredential.isConditionalMediationAvailable()
        : false)
    ) {
      toast.error("Passkey is not available");
      return;
    }

    authClient.signIn.passkey({ autoFill: true });
  }, []);

  const handleSignInWithPasskey = async () => {
    try {
      await authClient.signIn.passkey();
      router.navigate({ to: appConfig.authRoutes.onboarding });
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <Button
        className="w-full"
        icon={<IconMail />}
        onClick={() => router.navigate({ to: appConfig.authRoutes.magicLink })}
        variant="secondary"
      >
        Magic Link
      </Button>
      <Button
        className="w-full"
        icon={<IconMail />}
        onClick={() =>
          router.navigate({ to: appConfig.authRoutes.signinWithOtp })
        }
        variant="secondary"
      >
        Sign in with OTP
      </Button>
      <GoogleSignInButton />
      <GithubSignInButton />
      <Button
        className="w-full"
        icon={<IconKey />}
        onClick={handleSignInWithPasskey}
        variant="secondary"
      >
        Passkey
      </Button>
    </div>
  );
}
