import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth/auth-client";
import { authQueryOptions } from "@/lib/auth/queries";
import { cn } from "@/lib/utils";

export function SignOutButton({ className }: { className?: string }) {
  const queryClient = useQueryClient();
  const router = useRouter();
  return (
    <Button
      className={cn("w-fit", className)}
      onClick={async () => {
        await authClient.signOut({
          fetchOptions: {
            onResponse: async () => {
              // manually set to null to avoid unnecessary refetching
              queryClient.setQueryData(authQueryOptions().queryKey, null);
              await router.invalidate();
            },
          },
        });
      }}
      size="sm"
      type="button"
      variant="destructive"
    >
      Sign out
    </Button>
  );
}
