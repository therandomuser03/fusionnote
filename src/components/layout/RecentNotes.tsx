"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";
import { CalendarClock } from "lucide-react";
import { tiptapJsonToPlainText } from "@/utils/tiptap-extensions";
import { JSONContent } from "@/types/tiptap";
import { format } from "date-fns";

type Note = {
  id: string;
  title: string;
  description: string;
  image?: string | null;
  createdAt: string; // Add this
};

type RawNote = {
  _id: string;
  title: string;
  content: string | JSONContent;
  image?: string | null;
  createdAt: string; // Add this
};

export default function RecentNotes() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await fetch("/api/notes");
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || "Failed to fetch notes");

        const transformed = (data as RawNote[]).map((note) => {
          let description = "";

          try {
            if (typeof note.content === "string") {
              try {
                const parsed = JSON.parse(note.content) as JSONContent;
                description = tiptapJsonToPlainText(parsed);
              } catch {
                description = note.content;
              }
            } else if (note.content && typeof note.content === "object") {
              description = tiptapJsonToPlainText(note.content as JSONContent);
            }
          } catch {
            description = "Error loading content";
          }

          return {
            id: note._id,
            title: note.title,
            description,
            image: note.image || null,
            createdAt: note.createdAt, // 👈 Add this
          };
        });

        // Show only the 3 most recent notes
        setNotes(transformed.slice(0, 3));
      } catch (err) {
        console.error("Error fetching recent notes:", err);
      }
    };

    fetchNotes();
  }, []);

  return (
    <>
      <h3 className="z-20 text-2xl font-medium mx-auto items-center justify-center py-3 max-w-6xl">
        Recent Notes
      </h3>

      <div className="z-20 w-full flex items-center justify-center gap-8">
        <div className="w-6xl inline-grid grid-cols-3 gap-4">
          {notes.map((note) => (
            <Card
              key={note.id}
              className="w-full max-w-sm overflow-hidden rounded-lg shadow"
            >
              <CardHeader className="relative h-36 p-0 overflow-hidden">
                {note.image ? (
                  <Image
                    src={note.image}
                    alt={note.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl font-bold text-primary/30 blur-xs scale-150 text-center px-4">
                      {note.title}
                    </span>
                  </div>
                )}
              </CardHeader>

              <CardContent className="p-4">
                <CardTitle>{note.title}</CardTitle>
                <CardDescription>
                  {note.description.length > 140
                    ? `${note.description.substring(0, 140)}...`
                    : note.description}
                </CardDescription>
              </CardContent>

              <CardFooter className="mt-auto px-4 pb-4">
                <div className="w-full flex justify-between items-center text-sm text-muted-foreground">
                  <div className="inline-flex items-center gap-1">
                    <CalendarClock size={16} />
                    {format(new Date(note.createdAt), "MMM d, yyyy · h:mm a")}
                  </div>
                  <Link href={`/notes/${note.id}`}>
                    <Button variant="outline">View</Button>
                  </Link>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
