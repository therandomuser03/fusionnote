import { Copy, Lock, Plus, Share } from "lucide-react";
import React from "react";
import { SimpleEditor } from "./tiptap/tiptap-templates/simple/simple-editor";
import { Button } from "./ui/button";
import LoadingCircleSpinner from "./animations/Loading";
import Link from "next/link";

export default function Editor() {
  return (
    <section className="bg-background">
      <div className="w-full max-w-6xl mx-auto rounded-xl shadow-lg border border-gray-300 dark:border-neutral-700 overflow-hidden">
        {/* Header */}
        <div className="bg-gray-100 dark:bg-neutral-800 px-4 py-2 flex items-center justify-between border-b border-gray-300 dark:border-neutral-700">
          {/* Traffic lights */}
          <div className="flex space-x-2">
            <span className="w-3 h-3 bg-red-500 rounded-full" />
            <span className="w-3 h-3 bg-yellow-500 rounded-full" />
            <span className="w-3 h-3 bg-green-500 rounded-full" />
          </div>
          <span className="inline-flex items-baseline text-sm text-gray-500 dark:text-gray-400 gap-2">
            <Lock
              className="w-3 h-3 text-gray-500 dark:text-gray-400"
              style={{ marginTop: "1px" }}
            />
            fusionnote.vercel.app
          </span>
          <div className="flex space-x-2 gap-1">
            <Share className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <Plus className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <Copy className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          </div>
        </div>

        {/* Body */}
        <div className="bg-white dark:bg-neutral-950 text-neutral-950 dark:text-white">
          <div className="relative">
            {/* Overlay with fade-in-down effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/90 to-white dark:from-neutral-950/80 dark:via-neutral-950/90 dark:to-neutral-950 backdrop-blur-xxs z-10 fade-down">
              <div className="flex flex-col items-center justify-center h-full space-y-4">
                <LoadingCircleSpinner />
                <p className="text-lg font-medium">To try FusionNote</p>
                <Button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-indigo-800 dark:hover:bg-indigo-700 text-white font-medium rounded-md shadow-md transition-colors">
                  <Link href="#">
                  Log In
                  </Link>
                </Button>
              </div>
            </div>

            {/* Editor content below overlay */}
            <SimpleEditor />
          </div>
        </div>
      </div>
    </section>
  );
}
