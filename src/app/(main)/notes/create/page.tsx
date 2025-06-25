import React from "react";
import { SimpleEditor } from "@/components/tiptap/tiptap-templates/simple/simple-editor";
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
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// import AppFooter from "@/components/layout/AppFooter";

export default function Create() {
  return (
    <div>
      <div className="sticky z-50">
        <div className="mx-auto items-center justify-center pt-2 max-w-6xl">
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
                  <DropdownMenuTrigger className="flex items-center gap-1">
                    Toggle menu
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuItem>Documentation</DropdownMenuItem>
                    <DropdownMenuItem>Themes</DropdownMenuItem>
                    <DropdownMenuItem>GitHub</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/docs/components">Components</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <AppNavbar />
      </div>

      <div className="mx-auto items-center justify-center pt-38 py-12 max-w-6xl">
        <input
          type="text"
          placeholder="Title"
          className="border-none focus:outline-none text-4xl w-full pl-2"
        />
      </div>

      <div className="flex-grow mx-auto items-center justify-center border border-accent rounded-xl max-w-6xl">
        <SimpleEditor />
      </div>

      {/* <div className="bg-neutral-950">
      <AppFooter />
      </div> */}
    </div>
  );
}
