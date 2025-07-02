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
import { tiptapJsonToPlainText } from "@/utils/tiptap-extensions"; // ✅ make sure this exists
import { JSONContent } from "@/types/tiptap";
import { toast } from "sonner";
import { Pin, PinOff } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

type Note = {
  _id: string;
  title: string;
  content: string | JSONContent;
  image?: string;
};

// ...imports stay the same

export default function PinnedNotes() {
  const [notes, setNotes] = useState<Note[]>([]);

  const fetchPinnedNotes = async () => {
    try {
      const res = await fetch("/api/notes/pinned");
      const data = await res.json();

      if (!res.ok)
        throw new Error(data.error || "Failed to fetch pinned notes");

      setNotes(data);
    } catch (err) {
      console.error("❌ Error fetching pinned notes:", err);
      toast.error("Failed to load pinned notes");
    }
  };

  useEffect(() => {
    fetchPinnedNotes();
  }, []);

  const getPlainText = (content: string | JSONContent): string => {
    try {
      if (typeof content === "string") {
        const parsed = JSON.parse(content);
        return tiptapJsonToPlainText(parsed);
      } else {
        return tiptapJsonToPlainText(content);
      }
    } catch {
      return "Error loading content";
    }
  };

  const handleUnpin = async (noteId: string) => {
    try {
      const res = await fetch(`/api/notes/${noteId}/pin`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pinned: false }),
      });

      if (!res.ok) throw new Error("Failed to unpin note");

      toast.success("Note unpinned");
      fetchPinnedNotes(); // Refresh list
    } catch (err) {
      console.error("❌ Unpin failed:", err);
      toast.error("Failed to unpin note");
    }
  };

  return (
    <>
      <h3 className="z-20 text-2xl font-medium mx-auto items-center justify-center py-3 max-w-6xl">
        Pinned Notes
      </h3>

      {notes.length === 0 ? (
        <p className="text-center text-muted-foreground py-8">
          No pinned notes.
        </p>
      ) : (
        <div className="z-20 w-full flex items-center justify-center gap-8">
          <div className="w-6xl inline-grid grid-cols-3 gap-4">
            {notes.map((note) => (
              <Card
                key={note._id}
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
                      <span className="text-4xl font-bold text-primary/30 blur-sm scale-150 text-center px-4">
                        {note.title}
                      </span>
                    </div>
                  )}
                </CardHeader>

                <CardContent className="p-4">
                  <CardTitle>{note.title}</CardTitle>
                  <CardDescription>
                    {getPlainText(note.content).slice(0, 140)}...
                  </CardDescription>
                </CardContent>

                <CardFooter className="mt-auto px-4 pb-4">
                  <div className="w-full flex justify-between items-center text-sm text-muted-foreground">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          className="bg-yellow-400 text-black group hover:bg-gray-200 hover:text-gray-700"
                          onClick={() => handleUnpin(note._id)}
                        >
                          <Pin className="group-hover:hidden" />
                          <PinOff className="hidden group-hover:block" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="top">
                        <p>Unpin note</p>
                      </TooltipContent>
                    </Tooltip>

                    <Link href={`/notes/${note._id}`}>
                      <Button variant="outline">View</Button>
                    </Link>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
