"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  PenLine,
  BookOpen,
  Share2,
  Image,
  FileText,
  Lock,
  Palette,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FC, SVGProps } from "react";

interface Feature {
  name: string;
  description: string;
  icon: FC<SVGProps<SVGSVGElement>>;
}

const features: Feature[] = [
  {
    name: "Rich Text Editor",
    description: "Write and format your notes with our intuitive WYSIWYG editor.",
    icon: BookOpen,
  },
  {
    name: "Image Support",
    description: "Add and organize images within your notes seamlessly.",
    icon: Image,
  },
  {
    name: "Export & Share",
    description: "Export your notes to Notion, Google Keep, and other platforms.",
    icon: Share2,
  },
  {
    name: "Markdown Support",
    description: "Write in Markdown and see live preview of your content.",
    icon: FileText,
  },
  {
    name: "Private & Secure",
    description: "Your notes are encrypted and only accessible to you.",
    icon: Lock,
  },
  {
    name: "Customizable Themes",
    description: "Personalize your writing environment with custom themes.",
    icon: Palette,
  },
];

export default function Home() {
  const router = useRouter();

  return (
    <>
      {/* Navbar */}
      <nav className="sticky top-0 z-10 w-full border-b bg-background dark:bg-neutral-950 text-foreground dark:text-white backdrop-blur">
        <div className="container mx-auto flex h-14 items-center px-4">
          {/* Left side (Logo) */}
          <div className="flex items-center space-x-2">
            <Link href="/" className="flex items-center space-x-2">
              <PenLine className="h-6 w-6" />
              <span className="font-bold">FusionNote</span>
            </Link>
          </div>
          {/* Right side (Actions) */}
          <div className="ml-auto flex items-center space-x-2">
            <Button variant="ghost" asChild>
              <Link href="/authform">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/authform">Get Started</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative bg-background dark:bg-neutral-950 text-foreground dark:text-white isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <PenLine className="h-12 w-12 text-primary" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              FusionNote
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              A powerful, open-source note-taking app that seamlessly integrates with your favorite platforms.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button size="lg" asChild>
                <Link href="/authform">Start Writing</Link>
              </Button>
              <Button variant="outline" size="lg">
                Learn more
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 sm:py-32 bg-muted/50 dark:bg-neutral-950 text-foreground dark:text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">
              Write Better Notes
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Everything you need for smart note-taking
            </p>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              FusionNote combines powerful features with elegant design to create the perfect note-taking experience.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              {features.map((feature) => (
                <div key={feature.name} className="relative pl-16">
                  <dt className="text-base font-semibold leading-7">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary dark:bg-secondary">
                      <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-muted-foreground">
                    {feature.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </>
  );
}
