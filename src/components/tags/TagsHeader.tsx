"use client";

import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export default function TagsHeader() {
  const [, setData] = useState<{ _id?: string; username?: string }>({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.post("/api/users/profile");
        setData({
          _id: res.data.data._id,
          username: res.data.data.username,
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
        <div className="flex justify-between border-b">
          <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            Tags
          </h2>
        </div>
      </div>
    </div>
  );
}
