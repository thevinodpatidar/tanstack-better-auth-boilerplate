import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Image } from "@unpic/react";
import { Suspense } from "react";
import { SignOutButton } from "@/components/signout-button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { authQueryOptions } from "@/lib/auth/queries";

export const Route = createFileRoute("/")({ component: App });

function App() {
  return (
    <div className="grid h-svh min-h-svh grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 sm:p-20">
      <main className="row-start-2 flex flex-col items-center gap-[32px] text-center">
        <div className="flex flex-col items-center gap-8 sm:flex-row">
          <Image
            alt="TanStack Word logo"
            className="dark:invert"
            height={38}
            src="/tanstack-black-logo.svg"
            width={180}
          />
          <span className="font-bold text-2xl">+</span>
          <Image
            alt="Better Auth logo"
            height={38}
            src="/better-auth.svg"
            width={180}
          />
        </div>

        <div className="max-w-[600px] space-y-4">
          <h1 className="font-bold text-4xl tracking-tight">
            TanStack + Better Auth Boilerplate
          </h1>
          <p className="text-lg text-muted-foreground">
            A modern authentication boilerplate built with TanStack and Better
            Auth. Get started with a secure, scalable authentication system in
            minutes.
          </p>
        </div>
        <Suspense fallback={<div className="py-6">Loading user...</div>}>
          <UserAction />
        </Suspense>

        <ThemeToggle />
        {/* <div className="flex flex-col gap-4 items-center">
          <Link
            className="w-full sm:w-auto"
          >
            Get Started.
          </Link>
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              className="text-primary hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div> */}

        <div className="grid grid-cols-1 gap-8 text-center sm:grid-cols-3">
          <div className="space-y-2">
            <span className="font-semibold">Modern Stack</span>
            <p className="text-muted-foreground text-sm">
              Built with TanStack, React Server Components, and Tailwind CSS
            </p>
          </div>
          <div className="space-y-2">
            <span className="font-semibold">Secure Auth</span>
            <p className="text-muted-foreground text-sm">
              Enterprise-grade authentication with Better Auth
            </p>
          </div>
          <div className="space-y-2">
            <span className="font-semibold">Ready to Deploy</span>
            <p className="text-muted-foreground text-sm">
              Deploy instantly to Vercel with zero configuration
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

function UserAction() {
  const { data: user } = useSuspenseQuery(authQueryOptions());

  return user ? (
    <div className="flex flex-col items-center gap-2">
      <p>Welcome back, {user.name}!</p>
      <Button asChild className="mb-2 w-fit" size="lg" type="button">
        <Link to="/onboarding">Go to Dashboard</Link>
      </Button>
      <div className="text-center text-xs sm:text-sm">
        <ul>
          <li>User ID: {user.id}</li>
          <li>User Email: {user.email}</li>
          <li>User Name: {user.name}</li>
        </ul>
      </div>

      <SignOutButton />
    </div>
  ) : (
    <div className="flex flex-col items-center gap-2">
      <p>You are not signed in.</p>
      <Button asChild className="w-fit" size="lg" type="button">
        <Link to="/signin">Log in</Link>
      </Button>
    </div>
  );
}
