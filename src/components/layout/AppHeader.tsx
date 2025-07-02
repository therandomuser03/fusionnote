"use client";

import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { FileText, Pin, Plus, Trash } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export default function AppHeader() {
  const [data, setData] = useState<{ _id?: string; name?: string }>({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.post("/api/users/profile");
        const fullName = res.data.data.name || "";
        const firstName = fullName.trim().split(" ")[0];

        setData({
          _id: res.data.data._id,
          name: firstName,
        });
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="z-20 w-full flex items-center justify-center gap-8">
      <div className="mt-32 w-6xl">
        <div>
          <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            Welcome back, {data.name}!
          </h2>
        </div>
        <div className="flex justify-between border-b pb-2">
          <h4>
            You have <FileText className="inline-flex size-5" /> _ notes |{" "}
            <Pin className="inline-flex size-5" /> _ pinned |{" "}
            <Trash className="inline-flex size-5" /> _ in trash
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
