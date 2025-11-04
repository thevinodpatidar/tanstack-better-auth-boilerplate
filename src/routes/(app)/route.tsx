import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { appConfig } from "@/constants/config";
import { authQueryOptions } from "@/lib/auth/queries";

export const Route = createFileRoute("/(app)")({
  component: Outlet,
  beforeLoad: async ({ context }) => {
    const user = await context.queryClient.ensureQueryData({
      ...authQueryOptions(),
      revalidateIfStale: true,
    });
    if (!user) {
      throw redirect({ to: appConfig.authRoutes.signin });
    }

    // re-return to update type as non-null for child routes
    return { user };
  },
});
