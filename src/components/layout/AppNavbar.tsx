"use client";

import React, { useEffect, useState } from "react";
import {
  Bell,
  Command,
  CreditCard,
  LogOut,
  PenLineIcon,
  Search,
  UserCircle,
} from "lucide-react";
import SearchCommand from "./SearchCommand";
import { Button } from "../ui/button";
import { ModeToggle } from "./ThemeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";

export default function AppNavbar() {
  const [open, setOpen] = useState(false);
  const [isMac, setIsMac] = useState(false);
  const [userEmail, setUserEmail] = useState<string>("");
  const [userName, setUserName] = useState<string>("");

  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMac(navigator.platform.toUpperCase().includes("MAC"));
    }

    const fetchUser = async () => {
      try {
        const res = await axios.post("/api/users/profile");
        setUserEmail(res.data.data.email);
        setUserName(res.data.data.name);
      } catch (error) {
        console.error("Failed to fetch user email:", error);
        console.error("Failed to fetch user name:", error);
      }
    };

    fetchUser();
  }, []);

  const logout = async () => {
    try {
      await axios.get("api/users/logout");
      toast.success("Logout Success");
      router.push("/login");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
        toast.error(error.message);
      } else {
        console.log("An unexpected error occurred during logout.");
        toast.error("An unexpected error occurred.");
      }
    }
  };

  return (
    <>
      {/* The Command Dialog itself */}
      <SearchCommand open={open} setOpen={setOpen} />

      <div className="absolute z-20 flex w-full items-center justify-center gap-8">
        <div>
          <header className="border-2 border-neutral-100 dark:border-card relative z-10 flex h-12 w-full min-w-6xl items-center justify-baseline gap-4 rounded-t-2xl bg-white dark:bg-neutral-950/80 backdrop-blur-sm px-4 lg:h-auto lg:w-auto lg:rounded-3xl lg:bg-ln-gray-0 lg:p-[14px] shadow-lg lg:shadow-ln-xs">
            {/* lg:justify-start */}
            <Link href="/">
              <div className="flex items-end gap-1">
                <div className="border border-primary p-3 bg-primary rounded-xl flex items-center justify-center">
                  <PenLineIcon className="text-secondary h-4 w-4" />
                </div>
                <span className="inline-flex items-center px-1.5 py-0.5 text-[10px] font-medium rounded-md border border-neutral-600 text-neutral-500">
                  v1
                </span>
              </div>
            </Link>

            <div className="inline-flex">
              <NavigationMenu viewport={false}>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      asChild
                      className={navigationMenuTriggerStyle()}
                    >
                      <Link href="/dashboard">Dashboard</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuLink
                      asChild
                      className={navigationMenuTriggerStyle()}
                    >
                      <Link href="/notes">Notes</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuLink
                      asChild
                      className={navigationMenuTriggerStyle()}
                    >
                      <Link href="/tags">Tags</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            <div className="flex gap-2 items-center ml-auto">
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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage alt="@shadcn" />
                    {/* MODIFIED THIS LINE */}
                    <AvatarFallback>
                      {userName ? userName.charAt(0).toUpperCase() : "U"}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="min-w-56 rounded-lg mt-5"
                  align="end"
                  sideOffset={4}
                >
                  <DropdownMenuLabel className="p-2 font-medium">
                    {userName || "Loading..."}
                    <br />
                    {userEmail || "Loading..."}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <Link href="/profile">
                      <DropdownMenuItem>
                        <UserCircle className="mr-2 h-4 w-4" />
                        Account
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem>
                      <CreditCard className="mr-2 h-4 w-4" />
                      Billing
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Bell className="mr-2 h-4 w-4" />
                      Notifications
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="destructive" onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
        </div>
      </div>
    </>
  );
}
