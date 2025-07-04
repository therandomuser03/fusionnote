// src/components/tags/TagsContent.tsx
"use client";

import React from "react";
import Link from "next/link";

const tags = [
  "Work",
  "Ideas",
  "Personal",
  "Meeting",
  "Research",
  "Inspiration",
  "Project X",
  "Quick Notes",
  "Reading",
  "Clients",
  "Finance",
  "Tasks",
  "Goals",
  "Daily Logs",
];

export default function TagsContent() {
  return (
    <div className="z-20 max-w-6xl flex flex-col items-start justify-center mx-auto">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 w-full">
        {tags.map((name) => {
          const slug = name.toLowerCase().replace(/\s+/g, "-");
          return (
            <Link href={`/tags/${slug}`} key={slug}>
              <div className="bg-muted px-6 py-3 text-center rounded-xl text-white font-medium hover:bg-muted/70 transition cursor-pointer shadow-sm border border-border">
                {name}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
