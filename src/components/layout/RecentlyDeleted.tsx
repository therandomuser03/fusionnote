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
import { CalendarClockIcon, LucideTrash2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { formatDistanceToNow } from "date-fns";
import { tiptapJsonToPlainText } from "@/utils/tiptap-extensions";
import { JSONContent } from "@/types/tiptap";

type Note = {
  id: string;
  title: string;
  description: string;
  image?: string | null;
  deletedAt: string;
};

type RawNote = {
  _id: string;
  title: string;
  content: string | JSONContent;
  image?: string | null;
  deletedAt: string;
};

export default function RecentlyDeleted() {
  const [notes, setNotes] = useState<Note[]>([]);

  // ✅ Safe JSON parse utility
  const safeJsonParse = async (res: Response) => {
    const text = await res.text();
    return text ? JSON.parse(text) : null;
  };

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await fetch("/api/notes/delete");
        const data = await res.json();

        if (!res.ok)
          throw new Error(data.error || "Failed to fetch deleted notes");

        const transformed: Note[] = (data.notes || []).map((note: RawNote) => {
          let description = "";
          if (typeof note.content === "string") {
            try {
              description = tiptapJsonToPlainText(JSON.parse(note.content));
            } catch {
              description = note.content;
            }
          } else {
            description = tiptapJsonToPlainText(note.content as JSONContent);
          }

          return {
            id: note._id,
            title: note.title,
            description,
            image: note.image ?? null,
            deletedAt: note.deletedAt,
          };
        });

        setNotes(transformed);
      } catch (err) {
        console.error("Error loading deleted notes:", err);
      }
    };

    fetchNotes();
  }, []);

  // ✅ DELETE FOREVER
  const handleDeleteForever = async (id: string) => {
    try {
      const res = await fetch(`/api/notes/delete/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await safeJsonParse(res);
        throw new Error(data?.error || "Failed to delete note");
      }

      setNotes((prev) => prev.filter((note) => note.id !== id));
    } catch (error) {
      console.error("Delete error:", error);
      alert("Could not delete note forever.");
    }
  };

  // ✅ RESTORE
  const handleRestore = async (id: string) => {
    try {
      const res = await fetch(`/api/notes/delete/${id}`, {
        method: "PATCH",
      });

      if (!res.ok) {
        const data = await safeJsonParse(res);
        throw new Error(data?.error || "Failed to restore note");
      }

      setNotes((prev) => prev.filter((note) => note.id !== id));
    } catch (error) {
      console.error("Restore error:", error);
      alert("Could not restore note.");
    }
  };

  return (
    <>
      <h3 className="z-20 text-2xl font-medium mx-auto items-center justify-center py-3 max-w-6xl">
        Recently Deleted
      </h3>
      <div className="z-20 w-full flex items-center justify-center gap-8">
        {notes.length === 0 ? (
          <div className="text-muted-foreground text-lg text-center py-12">
            No deleted notes.
          </div>
        ) : (
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

                <CardFooter className="mt-auto px-4 flex-col items-start gap-2">
                  <div className="w-full flex justify-between items-center text-sm text-muted-foreground">
                    <div className="inline-flex items-center gap-1">
                      <CalendarClockIcon size={16} />
                      Deleted{" "}
                      {formatDistanceToNow(new Date(note.deletedAt), {
                        addSuffix: true,
                      })}
                    </div>

                    <div className="flex gap-2 items-center">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => handleDeleteForever(note.id)}
                          >
                            <LucideTrash2 className="w-4 h-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="top">
                          <p>Delete forever</p>
                        </TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleRestore(note.id)}
                          >
                            <span className="sr-only">Restore</span>
                            ♻️
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="top">
                          <p>Restore note</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
