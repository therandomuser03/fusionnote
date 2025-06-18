"use client";

import React, { useEffect, useState } from "react";
import SearchCommand from "./layout/SearchCommand";
import {
  Command,
  PenLineIcon,
  Search,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import Link from "next/link";
import { ModeToggle } from "./layout/ThemeToggle";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMac(navigator.platform.toUpperCase().includes("MAC"));
    }
  }, []);

  return (
    <>
      {/* The Command Dialog itself */}
      <SearchCommand open={open} setOpen={setOpen} />

      <div className="absolute z-20 flex w-full items-center justify-center gap-8">
        <div className="pt-6">
            <header className="border-2 border-neutral-100 dark:border-card relative z-10 flex h-12 w-full items-center justify-between gap-4 rounded-t-2xl bg-white dark:bg-neutral-950/80 backdrop-blur-sm px-4 lg:h-auto lg:w-auto lg:justify-start lg:rounded-3xl lg:bg-ln-gray-0 lg:p-[14px] shadow-lg lg:shadow-ln-xs">
            <div className="flex items-end gap-1">
              <div className="border border-primary p-3 bg-primary rounded-xl flex items-center justify-center">
                <PenLineIcon className="text-secondary h-4 w-4" />
              </div>
              <span className="inline-flex items-center px-1.5 py-0.5 text-[10px] font-medium rounded-md border border-neutral-600 text-neutral-500">
                v1
              </span>
            </div>

            <NavigationMenu viewport={false}>
              <NavigationMenuList>
                <NavigationMenuItem className="group relative">
                  <NavigationMenuTrigger>Features</NavigationMenuTrigger>
                  <NavigationMenuContent className="mt-8">
                    <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      <ListItem href="/docs" title="Real-time Sync">
                        Collaborative editing in real-time.
                      </ListItem>
                      <ListItem
                        href="/docs/installation"
                        title="Markdown Support"
                      >
                        Type like a dev.
                      </ListItem>
                      <ListItem
                        href="/docs/primitives/typography"
                        title="Tagging & Folders"
                      >
                        Organize your notes.
                      </ListItem>
                      <ListItem
                        href="/docs/primitives/typography"
                        title="Custom Themes"
                      >
                        Personalize your workspace.
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink
                    asChild
                    className={navigationMenuTriggerStyle()}
                    >
                    <Link href="/pricing">Pricing</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Templates</NavigationMenuTrigger>
                  <NavigationMenuContent className="mt-8">
                    <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      <ListItem href="/docs" title="Meeting Notes">
                        Structure for calls.
                      </ListItem>
                      <ListItem href="/docs/installation" title="Daily Journal">
                        Habit-building.
                      </ListItem>
                      <ListItem
                        href="/docs/primitives/typography"
                        title="Project Planner"
                      >
                        Organize project tasks.
                      </ListItem>
                      <ListItem
                        href="/docs/primitives/typography"
                        title="Reading Notes"
                      >
                        For book/article notes.
                      </ListItem>
                      <ListItem
                        href="/docs/primitives/typography"
                        title="Blank Template"
                      >
                        Start from scratch.
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className={navigationMenuTriggerStyle()}
                  >
                    <Link href="/docs">Docs</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>Changelog</NavigationMenuTrigger>
                  <NavigationMenuContent className="mt-8">
                    <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      <ListItem href="/docs" title="v1.0 Release">
                        First stable version.
                      </ListItem>
                      <ListItem href="/docs/installation" title="GitHub Repo">
                        View on GitHub.
                      </ListItem>
                      <ListItem
                        href="/docs/primitives/typography"
                        title="Roadmap"
                      >
                        Upcoming features.
                      </ListItem>
                      <ListItem
                        href="/docs/primitives/typography"
                        title="Feedback / Request"
                      >
                        User feature voting or form.
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <Button
              onClick={() => setOpen(true)}
              variant="ghost"
              className="flex items-center space-x-2 rounded-md border px-3 py-1 min-w-60 text-sm shadow-sm"
            >
              <span className="inline-flex gap-2 text-muted-foreground">
                <Search className="h-5 w-5" /> Search...
              </span>
              <span className="ml-auto">
                <kbd className="inline-flex items-center justify-center text-xs text-muted-foreground border border-neutral-600 px-1.5 py-0.5 rounded-md">
                  {isMac ? <Command className="text-xs" /> : "Ctrl"}+K
                </kbd>
              </span>
            </Button>
            <ModeToggle />
            <Button variant="outline">Log In</Button>
          </header>
        </div>
      </div>
    </>
  );
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
