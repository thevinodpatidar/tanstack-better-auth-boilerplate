import { createFileRoute } from "@tanstack/react-router";
import { listLinkedAccountsQueryOptions } from "@/lib/users/queries";
import ChangePassword from "./-components/change-password";
import EnableTwoFactor from "./-components/enable-two-factor";
import PasskeyList from "./-components/passkey";
import SetPassword from "./-components/set-password";

export const Route = createFileRoute("/(app)/profile/_pathlessLayout/security")(
  {
    component: RouteComponent,
    loader: async ({ context }) => {
      const accounts = await context.queryClient.ensureQueryData({
        ...listLinkedAccountsQueryOptions(),
        revalidateIfStale: true,
      });

      return { accounts };
    },
  }
);

function RouteComponent() {
  const { accounts } = Route.useLoaderData();

  const isCredentialProvider = accounts.some(
    (account) => account.providerId === "credential"
  );

  return (
    <div className="flex flex-col gap-4">
      {isCredentialProvider ? <ChangePassword /> : <SetPassword />}
      <EnableTwoFactor isCredentialProvider={isCredentialProvider} />
      <PasskeyList />
    </div>
  );
}
