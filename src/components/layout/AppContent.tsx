"use client";

import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { CalendarClockIcon } from "lucide-react";
import Image from "next/image";

type Note = {
  id: string;
  title: string;
  description: string;
  image?: string;
};

export default function AppContent() {
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
      <div className="z-20 w-full flex items-center justify-center gap-8">
        <div className="mt-4 w-6xl">
          <h3 className="scroll-m-20 pb-4 text-2xl font-semibold tracking-tight first:mt-0">
            My Notes
          </h3>
          <div className="flex gap-5">
            <div className="inline-flex gap-2 items-center align-middle">
              Sort By:{" "}
              <Select>
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="Date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Sort By</SelectLabel>
                    <SelectItem value="title a-z">Title (A-Z)</SelectItem>
                    <SelectItem value="title z-a">Title (Z-A)</SelectItem>
                    <SelectItem value="last modified">Last Modified</SelectItem>
                    <SelectItem value="created date">Created Date</SelectItem>
                    <SelectItem value="priority high-low">
                      Priority (High → Low)
                    </SelectItem>
                    <SelectItem value="priority low-high">
                      Priority (Low → High)
                    </SelectItem>
                    <SelectItem value="custom order">
                      Custom Order (drag-and-drop style)
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="inline-flex gap-2 items-center align-middle">
              Filter:{" "}
              <Select>
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="Tags" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Filter</SelectLabel>
                    <SelectItem value="categories">Categories</SelectItem>
                    <SelectItem value="date range">Date Range</SelectItem>
                    <SelectItem value="attachments">
                      Has Attachments (Yes/No)
                    </SelectItem>
                    <SelectItem value="favourited">Favourited Only</SelectItem>
                    <SelectItem value="shared with me">
                      Shared With Me
                    </SelectItem>
                    <SelectItem value="by author">By Author</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="inline-flex gap-2 items-center align-middle">
              View:{" "}
              <Select>
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="Grid" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>View</SelectLabel>
                    <SelectItem value="list">List</SelectItem>
                    <SelectItem value="compact view">Compact View</SelectItem>
                    <SelectItem value="timeline">Timeline</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      <div className="z-20 w-full flex items-center justify-center gap-8">
        <div className="w-6xl inline-grid grid-cols-3 gap-4 py-12">
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

              <CardFooter className="mt-auto px-4 pb-4">
                <div className="w-full flex justify-between items-center text-sm text-muted-foreground">
                  <div className="inline-flex items-center gap-1">
                    <CalendarClockIcon size={16} /> Date
                  </div>
                  <Button variant="outline">View Details</Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
