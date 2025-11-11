import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { authClient } from "@/lib/auth/auth-client";
import { listPasskeysQueryOptions } from "@/lib/users/queries";
import AddPasskeyDialog from "./add-passkey-dialog";

export default function PasskeyList() {
  const queryClient = useQueryClient();
  const { data: passkeys, isLoading: isLoadingPasskeys } = useQuery({
    ...listPasskeysQueryOptions(),
  });

  const { mutate: removePasskey, isPending: isRemovingPasskey } = useMutation({
    mutationFn: async (credentialId: string) => {
      await authClient.passkey.deletePasskey({ id: credentialId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: listPasskeysQueryOptions().queryKey,
      });
      toast.success("Passkey removed successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Passkey</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground text-sm">
          Passkeys are a secure and easy way to access your account.
        </p>
        <AddPasskeyDialog />
        <div className="flex flex-col gap-2">
          {isLoadingPasskeys ? (
            <div className="flex flex-col gap-2">
              {Array.from({ length: 2 }).map((_, index) => (
                <Skeleton className="h-10 w-full" key={index.toString()} />
              ))}
            </div>
          ) : (
            passkeys?.map((passkey) => (
              <Card className="gap-2" key={passkey.id}>
                <CardHeader>
                  <CardTitle>{passkey.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-2">
                    <p className="text-muted-foreground text-sm">
                      Device Type: {passkey.deviceType}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      Backed Up: {passkey.backedUp ? "Yes" : "No"}
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    disabled={isRemovingPasskey}
                    loading={isRemovingPasskey}
                    onClick={() => removePasskey(passkey.id)}
                    variant="destructive"
                  >
                    Remove
                  </Button>
                </CardFooter>
              </Card>
            ))
          )}
        </div>
        <Separator />
        <p className="text-muted-foreground text-sm">
          Note: Only one passkey can added for same device. If you want to add a
          new passkey, you need to remove the existing one first.
        </p>
      </CardContent>
    </Card>
  );
}
