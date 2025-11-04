import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { appConfig } from "@/constants/config";
import { getSessionFn } from "@/utils/get-session";

export const Route = createFileRoute("/(auth)")({
  component: RouteComponent,
  beforeLoad: async () => {
    const session = await getSessionFn();
    if (session?.session) {
      throw redirect({ to: appConfig.authRoutes.onboarding });
    }
  },
});

function RouteComponent() {
  return (
    <div className="flex h-svh flex-col items-center justify-center">
      <Outlet />
    </div>
  );
}
