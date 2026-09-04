import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, Layers, Sparkles, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4 sm:px-8">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <Sparkles className="h-6 w-6 text-primary" />
            <span>likely</span>
          </div>
          <nav className="flex items-center gap-4">
            <Button variant="ghost" size="sm">
              Documentation
            </Button>
            <Button size="sm">Get Started</Button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-24 sm:py-32 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold text-muted-foreground shadow-xs mb-8">
            <Zap className="h-3.5 w-3.5 text-amber-500" />
            <span>Next.js App Router + Tailwind CSS + shadcn/ui</span>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl mb-6">
            Welcome to <span className="text-primary">likely</span>
          </h1>

          <p className="mx-auto max-w-2xl text-lg sm:text-xl text-muted-foreground mb-10 leading-relaxed">
            Your modern full-stack starter kit. Crafted with Next.js 16, TypeScript, Tailwind CSS, and shadcn/ui components for rapid development.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="w-full sm:w-auto gap-2">
              Explore Starter <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              View Components
            </Button>
          </div>
        </section>

        {/* Feature Cards Section */}
        <section className="container mx-auto px-4 py-12 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="p-2 w-fit rounded-lg bg-primary/10 text-primary mb-2">
                  <Zap className="h-5 w-5" />
                </div>
                <CardTitle>Next.js 16 App Router</CardTitle>
                <CardDescription>
                  Leverage React Server Components, server actions, and optimized routing out of the box.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground">
                Built with TypeScript and strict ESLint configuration.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="p-2 w-fit rounded-lg bg-primary/10 text-primary mb-2">
                  <Layers className="h-5 w-5" />
                </div>
                <CardTitle>Tailwind CSS</CardTitle>
                <CardDescription>
                  Utility-first CSS framework for rapid UI development and modern styling.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground">
                Fully customizable design system with dark mode support.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="p-2 w-fit rounded-lg bg-primary/10 text-primary mb-2">
                  <Sparkles className="h-5 w-5" />
                </div>
                <CardTitle>shadcn/ui</CardTitle>
                <CardDescription>
                  Beautifully designed components that you can copy and paste into your apps.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground">
                Pre-configured with Button, Card, and customizable primitive components.
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-8 text-center text-sm text-muted-foreground">
        <div className="container mx-auto px-4">
          <p>© {new Date().getFullYear()} likely. Built with Next.js & shadcn/ui.</p>
        </div>
      </footer>
    </div>
  );
}
