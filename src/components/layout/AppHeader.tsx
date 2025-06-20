import React from "react";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function AppHeader() {
  return (
    <div className="z-20 w-full flex items-center justify-center gap-8">
      <div className="mt-32 w-6xl">
        <div className="flex justify-between border-b">
          <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            Welcome user!
          </h2>
          <Link href={"/notes/create"}>
            <Button variant="secondary">
              <Plus /> New
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
