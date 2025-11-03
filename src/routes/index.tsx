import { createFileRoute } from '@tanstack/react-router'
import { Image } from '@unpic/react'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-svh h-svh p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center text-center">
        <div className="flex flex-col sm:flex-row gap-8 items-center">
          <Image
            src="/tanstack-black-logo.svg"
            alt="TanStack Word logo"
            width={180}
            height={38}
          />
          <span className="text-2xl font-bold">+</span>
          <Image
            src="/better-auth.svg"
            alt="Better Auth logo"
            width={180}
            height={38}
          />
        </div>

        <div className="max-w-[600px] space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
            TanStack + Better Auth Boilerplate
          </h1>
          <p className="text-lg text-muted-foreground">
            A modern authentication boilerplate built with TanStack and Better
            Auth. Get started with a secure, scalable authentication system in
            minutes.
          </p>
        </div>

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

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <div className="space-y-2">
            <h3 className="font-semibold">Modern Stack</h3>
            <p className="text-sm text-muted-foreground">
              Built with TanStack, React Server Components, and Tailwind CSS
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Secure Auth</h3>
            <p className="text-sm text-muted-foreground">
              Enterprise-grade authentication with Better Auth
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Ready to Deploy</h3>
            <p className="text-sm text-muted-foreground">
              Deploy instantly to Vercel with zero configuration
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
