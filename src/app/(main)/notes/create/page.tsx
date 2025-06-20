import React from "react";
import { SimpleEditor } from "@/components/tiptap/tiptap-templates/simple/simple-editor";
import "@/styles/_keyframe-animations.scss";
import "@/styles/_variables.scss";
import AppNavbar from "@/components/layout/AppNavbar";
// import AppFooter from "@/components/layout/AppFooter";

export default function Create() {
  return (
    <div>
      <div className="sticky top-0 z-50">
        <AppNavbar />
      </div>

      <div className="mx-auto items-center justify-center pt-32 py-12 max-w-6xl">
        <input type="text" placeholder="Title" className="border-none focus:outline-none text-4xl w-full pl-2" />
      </div>

      <div className="flex-grow mx-auto items-center justify-center border border-accent rounded-xl max-w-6xl">
        <SimpleEditor />
      </div>

      {/* <div className="bg-neutral-950">
      <AppFooter />
      </div> */}
    </div>
  );
}
