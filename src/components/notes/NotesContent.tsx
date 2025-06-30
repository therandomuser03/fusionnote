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
import Link from "next/link";
import { tiptapJsonToPlainText } from "@/utils/tiptap-extensions";

type Note = {
  id: string;
  title: string;
  description: string;
  image?: string | null;
};

type RawNote = {
  _id: string;
  title: string;
  content: string | Record<string, unknown>; // You could replace this with TipTap JSONContent
  image?: string | null;
};

export default function NotesContent() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await fetch("/api/notes");
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || "Failed to fetch notes");

        const transformed = (data as RawNote[]).map((note) => ({
          id: note._id,
          title: note.title,
          description: tiptapJsonToPlainText(note.content),
          image: note.image || null,
        }));

        setNotes(transformed);
      } catch (err) {
        console.error("Error loading notes:", err);
      }
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
            {/* Sort Dropdown */}
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
                    <SelectItem value="priority high-low">Priority (High → Low)</SelectItem>
                    <SelectItem value="priority low-high">Priority (Low → High)</SelectItem>
                    <SelectItem value="custom order">Custom Order</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Filter Dropdown */}
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
                    <SelectItem value="attachments">Has Attachments</SelectItem>
                    <SelectItem value="favourited">Favourited Only</SelectItem>
                    <SelectItem value="shared with me">Shared With Me</SelectItem>
                    <SelectItem value="by author">By Author</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* View Dropdown */}
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

      {/* Notes Grid */}
      <div className="z-20 w-full flex items-center justify-center gap-8">
        <div className="w-6xl inline-grid grid-cols-3 gap-4 py-12">
          {notes.map((note) => (
            <Card key={note.id} className="w-full max-w-sm overflow-hidden rounded-lg shadow">
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
                  <Link href={`/notes/${note.id}`}>
                    <Button variant="outline">View Note</Button>
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
