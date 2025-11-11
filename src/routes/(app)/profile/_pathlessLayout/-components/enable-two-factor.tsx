import { AlertCircle, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { authClient } from "@/lib/auth/auth-client";
import DisableTwoFactorDialog from "./disable-two-factor-dialog";
import EnableTwoFactorDialog from "./enable-two-factor-dialog";

type EnableTwoFactorProps = {
  isCredentialProvider: boolean;
};

export default function EnableTwoFactor({
  isCredentialProvider,
}: EnableTwoFactorProps) {
  const { data, isPending } = authClient.useSession();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Two-factor authentication</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground text-sm">
          Two-factor authentication adds an extra layer of security to your
          account by requiring a code from an authenticator app in addition to
          your password.
        </p>
        {isCredentialProvider ? (
          (() => {
            if (isPending) {
              return <Loader2 className="size-4 animate-spin" />;
            }
            if (data?.user?.twoFactorEnabled) {
              return <DisableTwoFactorDialog />;
            }
            return <EnableTwoFactorDialog />;
          })()
        ) : (
          <p className="flex items-center gap-2 font-medium text-md text-orange-500/60">
            <AlertCircle className="size-4" />
            Set a password to enable two-factor authentication.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
