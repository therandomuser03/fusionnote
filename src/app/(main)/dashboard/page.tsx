import AppFooter from "@/components/layout/AppFooter";
import AppHeader from "@/components/layout/AppHeader";
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
import PinnedNotes from "@/components/layout/PinnedNotes";
import RecentNotes from "@/components/layout/RecentNotes";
import TopTags from "@/components/layout/TopTags";
import RecentlyDeleted from "@/components/layout/RecentlyDeleted";

export default function Dashboard() {
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
                    <BreadcrumbPage>Dashboard</BreadcrumbPage>
                  <DropdownMenuContent align="start">
                    
                  </DropdownMenuContent>
                </DropdownMenu>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <AppNavbar />
      </div>

      <AppHeader />

      <div className="flex-grow pt-16 pb-16">
        <PinnedNotes />
      </div>

      <div className="flex-grow pt-16 pb-16">
        <RecentNotes />
      </div>

      <div className="flex-grow pt-16 pb-16">
        <TopTags />
      </div>

      <div className="flex-grow pt-16 pb-16">
        <RecentlyDeleted />
      </div>

      {/* Footer always at bottom */}
      <AppFooter />
    </div>
  );
}
