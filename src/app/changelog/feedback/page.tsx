// app/changelog/feedback/page.tsx

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";
import FeedbackForm from "@/components/feedback/FeedbackForm";
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

export default async function Feedback() {
const token = (await cookies()).get("token")?.value;

  if (!token) {
    redirect(`/login?callbackUrl=/changelog/feedback`);
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET!) as {
      email: string;
    };
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
          <BreadcrumbLink asChild>
            <Link href="/">Changelog</Link>
          </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />

          <BreadcrumbItem>
          <DropdownMenu>
            <BreadcrumbPage>Feedback</BreadcrumbPage>
            <DropdownMenuContent align="start">
            
            </DropdownMenuContent>
          </DropdownMenu>
          </BreadcrumbItem>
        </BreadcrumbList>
        </Breadcrumb>
      </div>
      <AppNavbar />
      </div>

      <div className="flex-grow mt-24">
      <FeedbackForm userEmail={decoded.email} />
      </div>

      <div className="sticky bottom-0">
      <AppFooter />
      </div>
    </div>
  );
} catch {
    redirect(`/login?callbackUrl=/changelog/feedback`)
  }
}