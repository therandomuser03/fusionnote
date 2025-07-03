"use client";

import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { FileText, Pin, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

type Note = {
  _id: string;
  title: string;
  content: string;
  isPinned?: boolean;
};

export default function AppHeader() {
  const [user, setUser] = useState<{ _id?: string; name?: string }>({});
  const [notesCount, setNotesCount] = useState<number>(0);
  const [pinnedCount, setPinnedCount] = useState<number>(0);
  const [trashCount, setTrashCount] = useState<number>(0);

  useEffect(() => {
  const fetchUserAndNotes = async () => {
    try {
      const userRes = await axios.post("/api/users/profile");
      const fullName = userRes?.data?.data?.name || "";
      const firstName = fullName.trim().split(" ")[0];

      setUser({
        _id: userRes.data.data._id,
        name: firstName,
      });

      const notesRes = await axios.get<Note[]>("/api/notes");
      const notes = notesRes.data;

      setNotesCount(notes.length);
      setPinnedCount(notes.filter((note) => note.isPinned).length);

      // ✅ Fetch deleted notes count
      const deletedRes = await axios.get("/api/notes/delete");
      setTrashCount(deletedRes?.data?.notes?.length || 0);
    } catch (error) {
      console.error("❌ Failed to fetch user or notes:", error);
    }
  };

  fetchUserAndNotes();
}, []);

  return (
    <div className="z-20 w-full flex items-center justify-center gap-8">
      <div className="mt-32 w-6xl">
        <div>
          <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            Welcome back, {user.name}!
          </h2>
        </div>
        <div className="flex justify-between border-b pb-2">
          <h4>
            You have <FileText className="inline-flex size-5" /> {notesCount} notes |{" "}
            <Pin className="inline-flex size-5" /> {pinnedCount} pinned |{" "}
            <Trash2 className="inline-flex size-5" /> {trashCount} in trash
          </h4>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href="/notes/create">
                <Button variant="secondary">
                  <Plus /> New
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>Create new note</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
