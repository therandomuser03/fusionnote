// "use client";

import AppFooter from "@/components/layout/AppFooter";
import AppNavbar from "@/components/layout/AppNavbar";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import ProfileData from "@/components/auth/ProfileData";

export default function Profile() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Sticky top navbar */}
      <div className="sticky top-0 z-50 bg-background">
        <div className="mx-auto items-center justify-center py-3 max-w-6xl">
        <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              
              <BreadcrumbSeparator />
              
              <BreadcrumbItem>
                <DropdownMenu>
                    <BreadcrumbPage>Profile</BreadcrumbPage>
                  <DropdownMenuContent align="start">
                  </DropdownMenuContent>
                </DropdownMenu>
              </BreadcrumbItem>

            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <AppNavbar />
      </div>

      {/* <AppHeader /> */}

      {/* Main content should grow to fill space */}
      <div className="flex-grow pt-16 pb-16 mt-16">
        <ProfileData />
      </div>

      {/* Footer always at bottom */}
      <AppFooter />
    </div>
  );
}
