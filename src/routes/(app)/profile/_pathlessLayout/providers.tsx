import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { authClient } from "@/lib/auth/auth-client";
import {
  type ListLinkedAccountsQueryResult,
  listLinkedAccountsQueryOptions,
} from "@/lib/users/queries";

const providers: {
  key: string;
  label: string;
  icon: React.ReactNode;
}[] = [
  {
    key: "github",
    label: "GitHub",
    icon: <IconBrandGithub className="size-6" />,
  },
  {
    key: "google",
    label: "Google",
    icon: <IconBrandGoogle className="size-6" />,
  },
];

export const Route = createFileRoute(
  "/(app)/profile/_pathlessLayout/providers"
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: accounts, isLoading: isLoadingAccounts } = useQuery(
    listLinkedAccountsQueryOptions()
  );

  return (
    <Card className="rounded-2xl border bg-card text-card-foreground shadow-sm">
      <CardHeader>
        <CardTitle>Providers</CardTitle>
        <CardDescription>
          Connect your account with a third-party service.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {isLoadingAccounts ? (
          <div className="flex flex-col gap-4">
            {Array.from({ length: 2 }).map((_, index) => (
              <Skeleton className="h-16 w-full" key={index.toString()} />
            ))}
          </div>
        ) : (
          providers.map((provider) => (
            <ProviderItem
              accounts={accounts ?? []}
              key={provider.key}
              provider={provider}
            />
          ))
        )}
      </CardContent>
    </Card>
  );
}

function ProviderItem({
  accounts,
  provider,
}: {
  accounts: NonNullable<ListLinkedAccountsQueryResult>;
  provider: (typeof providers)[number & keyof typeof providers];
}) {
  const linkedAccount = accounts.find(
    (account) => account.providerId === provider.key
  );

  const queryClient = useQueryClient();

  const { mutate: linkAccount, isPending: isLinkingAccount } = useMutation({
    mutationKey: ["link-account"],
    mutationFn: async (providerId: string) =>
      await authClient.signIn.social({
        provider: providerId,
        callbackURL: "/profile/providers",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: listLinkedAccountsQueryOptions().queryKey,
      });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const { mutate: unlinkAccount, isPending: isUnlinkingAccount } = useMutation({
    mutationKey: ["unlink-account"],
    mutationFn: async ({
      providerId,
      accountId,
    }: {
      providerId: string;
      accountId: string;
    }) => await authClient.unlinkAccount({ providerId, accountId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: listLinkedAccountsQueryOptions().queryKey,
      });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return (
    <div
      className="flex items-center justify-between rounded-xl border bg-background/50 px-6 py-4"
      key={provider.key}
    >
      <div className="flex items-center gap-3">
        {provider.icon}
        <span className="font-medium text-sm">{provider.label}</span>
      </div>
      <Button
        loading={isUnlinkingAccount || isLinkingAccount}
        onClick={() => {
          if (linkedAccount) {
            unlinkAccount({
              providerId: linkedAccount.providerId,
              accountId: linkedAccount.accountId,
            });
          } else {
            linkAccount(provider.key);
          }
        }}
        size="sm"
        variant={linkedAccount ? "outline" : "default"}
      >
        {linkedAccount ? "Unlink" : "Link"}
      </Button>
    </div>
  );
}
