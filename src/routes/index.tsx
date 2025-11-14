import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Image } from "@unpic/react";
import {
  CheckCircle,
  Code,
  Github,
  Globe,
  Shield,
  Star,
  Users,
  Zap,
} from "lucide-react";
import { Suspense } from "react";
import { SignOutButton } from "@/components/signout-button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { authQueryOptions } from "@/lib/auth/queries";

export const Route = createFileRoute("/")({ component: App });

function App() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2 sm:gap-4">
            <Image
              alt="TanStack Word logo"
              className="h-6 w-auto sm:h-8 dark:invert"
              height={24}
              layout="fullWidth"
              src="/tanstack-black-logo.svg"
            />
            <span className="font-bold text-lg sm:text-xl">+</span>
            <Image
              alt="Better Auth logo"
              className="h-6 w-auto sm:h-8"
              height={24}
              layout="fullWidth"
              src="/better-auth.svg"
            />
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <ThemeToggle />
            <Suspense
              fallback={
                <div className="h-8 w-16 animate-pulse rounded bg-muted sm:w-20" />
              }
            >
              <UserAction />
            </Suspense>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-4 pt-24 pb-16">
        <div className="container mx-auto max-w-6xl text-center">
          <Badge className="mb-4" variant="secondary">
            🚀 Production Ready Boilerplate
          </Badge>
          <h1 className="mb-6 font-bold text-4xl tracking-tight md:text-6xl lg:text-7xl">
            Build Secure Apps
            <span className="block text-primary">10x Faster</span>
          </h1>
          <p className="mx-auto mb-8 max-w-3xl text-muted-foreground text-xl">
            A modern, full-stack authentication boilerplate powered by TanStack
            and Better Auth. Ship production-ready apps with enterprise-grade
            security, beautiful UI, and developer experience.
          </p>
          <div className="mb-8 flex justify-center gap-4">
            <Button asChild className="px-8 text-lg" variant="secondary">
              <Link to="/signin">Get Started</Link>
            </Button>
            <Button asChild className="px-8 text-lg">
              <a
                className="flex items-center gap-2"
                href="https://github.com/thevinodpatidar/tanstack-better-auth-boilerplate"
                rel="noopener noreferrer"
                target="_blank"
              >
                <Star className="h-5 w-5" />
                Star on GitHub
              </a>
            </Button>
          </div>
          <div className="flex justify-center">
            <Image
              alt="Dashboard preview"
              className="rounded-lg"
              height={400}
              src="/better-auth.svg"
              width={800}
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted/50 px-4 py-16">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-bold text-3xl md:text-4xl">
              Everything You Need to Build Modern Apps
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground text-xl">
              From authentication to deployment, we've got you covered with
              battle-tested solutions.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardContent className="p-6">
                <Shield className="mb-4 h-12 w-12 text-primary" />
                <h3 className="mb-2 font-semibold text-xl">
                  Enterprise Security
                </h3>
                <p className="text-muted-foreground">
                  Bank-level security with Better Auth. Support for OAuth, magic
                  links, passkeys, and more.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <Zap className="mb-4 h-12 w-12 text-primary" />
                <h3 className="mb-2 font-semibold text-xl">Lightning Fast</h3>
                <p className="text-muted-foreground">
                  Built with TanStack Query for optimal performance and React
                  Server Components for speed.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <Users className="mb-4 h-12 w-12 text-primary" />
                <h3 className="mb-2 font-semibold text-xl">
                  Multi-Tenant Ready
                </h3>
                <p className="text-muted-foreground">
                  Organization management, role-based access control, and team
                  collaboration built-in.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <Code className="mb-4 h-12 w-12 text-primary" />
                <h3 className="mb-2 font-semibold text-xl">
                  Developer Experience
                </h3>
                <p className="text-muted-foreground">
                  TypeScript, ESLint, Prettier, and modern tooling. Hot reload
                  and instant feedback.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <Globe className="mb-4 h-12 w-12 text-primary" />
                <h3 className="mb-2 font-semibold text-xl">Deploy Anywhere</h3>
                <p className="text-muted-foreground">
                  Vercel, Netlify, or your own infrastructure. Zero
                  configuration deployment.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <CheckCircle className="mb-4 h-12 w-12 text-primary" />
                <h3 className="mb-2 font-semibold text-xl">Production Ready</h3>
                <p className="text-muted-foreground">
                  Comprehensive testing, error handling, and monitoring. Ship
                  with confidence.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-4 py-16">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-bold text-3xl md:text-4xl">
              Get Started in Minutes
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground text-xl">
              Three simple steps to launch your next big idea.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary font-bold text-white text-xl">
                1
              </div>
              <h3 className="mb-2 font-semibold text-xl">Clone & Install</h3>
              <p className="text-muted-foreground">
                Clone the repository and run npm install. Everything is
                pre-configured.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary font-bold text-white text-xl">
                2
              </div>
              <h3 className="mb-2 font-semibold text-xl">Configure Auth</h3>
              <p className="text-muted-foreground">
                Set up your OAuth providers and database. Follow our detailed
                guide.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary font-bold text-white text-xl">
                3
              </div>
              <h3 className="mb-2 font-semibold text-xl">Deploy & Scale</h3>
              <p className="text-muted-foreground">
                Push to Vercel or your favorite platform. Handle millions of
                users.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="bg-muted/50 px-4 py-16">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="mb-8 font-bold text-3xl md:text-4xl">
            Built with Modern Tools
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-8">
            <div className="flex items-center gap-2">
              <Badge className="px-4 py-2" variant="outline">
                <Code className="mr-2 h-4 w-4" />
                React 18
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="px-4 py-2" variant="outline">
                <Zap className="mr-2 h-4 w-4" />
                TanStack
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="px-4 py-2" variant="outline">
                <Shield className="mr-2 h-4 w-4" />
                Better Auth
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="px-4 py-2" variant="outline">
                <Globe className="mr-2 h-4 w-4" />
                TypeScript
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="px-4 py-2" variant="outline">
                <Star className="mr-2 h-4 w-4" />
                Tailwind CSS
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="px-4 py-2" variant="outline">
                <Github className="mr-2 h-4 w-4" />
                Drizzle ORM
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="mb-4 font-bold text-3xl md:text-4xl">
            Ready to Build Something Amazing?
          </h2>
          <p className="mb-8 text-muted-foreground text-xl">
            Join thousands of developers who trust our boilerplate for their
            production apps.
          </p>
          <div className="mb-8 flex justify-center gap-4">
            <Button asChild className="px-8 text-lg" variant="secondary">
              <Link to="/signup">Get Started</Link>
            </Button>
            <Button asChild className="px-8 text-lg">
              <a
                className="flex items-center gap-2"
                href="https://umami.mailgenai.com/q/oFaP3STHL"
                rel="noopener noreferrer"
                target="_blank"
              >
                <Star className="h-5 w-5" />
                Star on GitHub
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t px-4 py-8">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-4">
              <Image
                alt="TanStack Word logo"
                className="h-6 w-auto dark:invert"
                height={24}
                layout="fullWidth"
                src="/tanstack-black-logo.svg"
              />
              <span className="font-semibold">+</span>
              <Image
                alt="Better Auth logo"
                className="h-6 w-auto"
                height={24}
                layout="fullWidth"
                src="/better-auth.svg"
              />
            </div>
            <div className="flex gap-6 text-muted-foreground text-sm">
              <a className="hover:text-foreground" href="/">
                Documentation
              </a>
              <a className="hover:text-foreground" href="/">
                Support
              </a>
              <a className="hover:text-foreground" href="/">
                Privacy
              </a>
              <a className="hover:text-foreground" href="/">
                Terms
              </a>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="text-center text-muted-foreground text-sm">
            © 2024 TanStack + Better Auth Boilerplate. Built with ❤️ for
            developers.
          </div>
        </div>
      </footer>
    </div>
  );
}

function UserAction() {
  const { data: user } = useSuspenseQuery(authQueryOptions());

  return user ? (
    <div className="flex items-center gap-1 sm:gap-3">
      <span className="hidden font-medium text-sm sm:inline">{user.name}</span>
      <Button
        asChild
        className="px-2 text-xs sm:px-3 sm:text-sm"
        size="sm"
        variant="outline"
      >
        <Link to="/onboarding">Dashboard</Link>
      </Button>
      <SignOutButton />
    </div>
  ) : (
    <Button asChild className="px-2 text-xs sm:px-3 sm:text-sm" size="sm">
      <Link to="/signin">Sign In</Link>
    </Button>
  );
}
