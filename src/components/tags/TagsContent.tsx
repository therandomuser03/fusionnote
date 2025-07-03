"use client";

import React, { useEffect, useState } from "react";
// import { Button } from "../ui/button";
import Link from "next/link";

type Tag = {
  name: string;
  slug: string;
};

export default function TagsContent() {
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await fetch("/api/tags"); // Optional real API
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || "Failed to fetch tags");

        setTags(data as Tag[]);
      } catch (err) {
        console.error("Error loading tags:", err);
        // Fallback/demo tags
        setTags([
          { name: "Work", slug: "work" },
          { name: "Ideas", slug: "ideas" },
          { name: "Personal", slug: "personal" },
          { name: "Meeting", slug: "meeting" },
          { name: "Research", slug: "research" },
          { name: "Inspiration", slug: "inspiration" },
          { name: "Project X", slug: "project-x" },
          { name: "Quick Notes", slug: "quick-notes" },
          { name: "Reading", slug: "reading" },
          { name: "Clients", slug: "clients" },
          { name: "Finance", slug: "finance" },
          { name: "Tasks", slug: "tasks" },
          { name: "Goals", slug: "goals" },
          { name: "Daily Logs", slug: "daily-logs" },
        ]);
      }
    };

    fetchTags();
  }, []);

  return (
    <div className="z-20 max-w-6xl flex flex-col items-start justify-center mx-auto">

      {/* Grid for Tags */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 w-full">
        {tags.map((tag) => (
          <Link href={`/tags/${tag.slug}`} key={tag.slug}>
            <div className="bg-muted px-6 py-3 text-center rounded-xl text-white font-medium hover:bg-muted/70 transition cursor-pointer shadow-sm border border-border">
              {tag.name}
            </div>
          </Link>
        ))}
      </div>

      {/* <Link href="/tags">
        <Button variant="outline" className="mt-6">
          Create a new tag
        </Button>
      </Link> */}
    </div>
  );
}
