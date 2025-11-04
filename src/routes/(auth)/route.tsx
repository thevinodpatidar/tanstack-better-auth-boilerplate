import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { appConfig } from "@/constants/config";
import { authQueryOptions } from "@/lib/auth/queries";

export const Route = createFileRoute("/(auth)")({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    const user = await context.queryClient.ensureQueryData({
      ...authQueryOptions(),
      revalidateIfStale: true,
    });
    if (user) {
      throw redirect({
        to: appConfig.authRoutes.onboarding,
      });
    }

    return {
      redirectUrl: appConfig.authRoutes.onboarding,
    };
  },
});

function RouteComponent() {
  return (
    <div className="flex h-svh flex-col items-center justify-center">
      <Outlet />
    </div>
  );
}
