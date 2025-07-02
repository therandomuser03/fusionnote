// src/app/(main)/notes/[noteId]/page.tsx

import NoteClientPage from "./client-wrapper";
import AppFooter from '@/components/layout/AppFooter';
import AppNavbar from '@/components/layout/AppNavbar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { DropdownMenu, DropdownMenuContent } from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import React from 'react';

type PageProps = {
  params: Promise<{
    noteId: string;
  }>;
};

export default async function Page({ params }: PageProps) {
  const { noteId } = await params;

  return (
    <div className="min-h-screen flex flex-col">
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
                  <BreadcrumbPage>Note Details</BreadcrumbPage>
                  <DropdownMenuContent align="start" />
                </DropdownMenu>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <AppNavbar />
      </div>

      <div className="flex-grow pt-16 pb-16">
        <NoteClientPage noteId={noteId} />
      </div>

      <AppFooter />
    </div>
  );
}