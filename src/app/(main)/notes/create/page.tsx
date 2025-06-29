import React from "react";
import { SimpleEditor } from "@/components/tiptap-main/tiptap-templates/simple/simple-editor";
import "@/styles/_keyframe-animations.scss";
import "@/styles/_variables.scss";
import AppNavbar from "@/components/layout/AppNavbar";
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

export default function Create() {
  return (
    <div className="min-h-screen flex flex-col overflow-auto bg-background">
      {/* Sticky Navbar */}
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
                <BreadcrumbLink asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbSeparator />

              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/notes">Notes</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbSeparator />

              <BreadcrumbItem>
                <DropdownMenu>
                  <BreadcrumbPage>Create Note</BreadcrumbPage>
                  <DropdownMenuContent align="start"></DropdownMenuContent>
                </DropdownMenu>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <AppNavbar />
      </div>

      {/* Page Content */}
      <main className="flex-1 w-full px-4 max-w-6xl mx-auto py-8 mt-16">

        <div className="border border-accent rounded-xl">
          <SimpleEditor />
        </div>
      </main>

    </div>
  );
}
