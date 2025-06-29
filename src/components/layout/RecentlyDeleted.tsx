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
import { CalendarClockIcon } from "lucide-react";

type Note = {
  id: string;
  title: string;
  description: string;
  image?: string;
};

export default function RecentlyDeleted() {
  const [notes, setNotes] = useState<Note[]>([]);

  // Mock fetch (replace this with real API call)
  useEffect(() => {
    const fetchNotes = async () => {
      // Example: Simulating a fetch call
      const dataFromBackend: Note[] = [
        {
          id: "1",
          title: "Note One",
          description: "This is note one.",
          image: "/sample1.jpg",
        },
        {
          id: "2",
          title: "Note Two",
          description: "This is note two.",
        },
        {
          id: "3",
          title: "Note Three",
          description: "This is note three.",
          image: "/sample3.jpg",
        },
      ];
      setNotes(dataFromBackend);
    };

    fetchNotes();
  }, []);

  return (
    <>
      <h3 className="z-20 text-2xl font-medium mx-auto items-center justify-center py-3 max-w-6xl">
        Recently Deleted
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
                    <span className="text-4xl font-bold text-primary/30 blur-sm scale-150 text-center px-4">
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
                  <CalendarClockIcon size={16} /> Deleted ___ day ago
                  </div>
                  <Button variant="outline">Restore</Button>
                </div>
                <Button variant="destructive">Go to Trash</Button>
                </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
