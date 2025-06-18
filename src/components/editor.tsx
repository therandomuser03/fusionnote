import { Copy, Lock, Plus, Share } from "lucide-react";
import React from "react";
import { SimpleEditor } from "./tiptap-templates/simple/simple-editor";

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
          <Lock className="w-3 h-3 text-gray-500 dark:text-gray-400" style={{ marginTop: "1px" }} />
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
      <SimpleEditor />
    </div>
    </div>
    </section>
  );
}


// import React from "react";

// export default function EditorMockup() {
//   return (
//     <div className="flex justify-center">
//       <div className="relative w-full max-w-6xl rounded-2xl overflow-hidden shadow-md border border-gray-200">
//         {/* Header Bar */}
//         <div className="flex items-center justify-between text-xs px-6 py-3 border-b border-gray-200 bg-white">
//           <div className="border border-neutral-600">
//             <div className="flex justify-between">
//               <span className="flex gap-1">
//                 <ul className="text-red-500 font-bold text-2xl">●</ul>
//                 <ul className="text-yellow-500 font-bold text-2xl">●</ul>
//                 <ul className="text-green-500 font-bold text-2xl">●</ul>
//               </span>
//               <span className="text-secondary">Lock</span>
//               <span className="text-secondary">123</span>
//             </div>
//             <div className="flex items-center space-x-2 text-gray-500">
//               <span className="font-medium">alignui-library</span>
//               <span className="bg-gray-100 text-[10px] px-1.5 py-0.5 rounded-md">
//                 v1.0
//               </span>
//             </div>
//             <div className="text-gray-600 font-mono">button.tsx</div>
//             <div className="text-gray-400">preview</div>
//           </div>
//         </div>

//         {/* Main Content Area */}
//         <div className="flex h-[420px] bg-white">
//           {/* Sidebar File Tree */}
//           <div className="w-64 border-r border-gray-200 bg-gray-50 p-4 text-xs">
//             <div className="font-semibold text-gray-700 mb-2">actions</div>
//             <ul className="space-y-1 text-gray-500">
//               <li className="text-red-500 font-semibold">● button.tsx</li>
//               <li className="opacity-70">button-group.tsx</li>
//               <li className="opacity-70">compact-button.tsx</li>
//               <li className="opacity-70">fancy-button.tsx</li>
//               <li className="opacity-70">link-button.tsx</li>
//               <li className="opacity-70">social-button.tsx</li>
//             </ul>
//           </div>

//           {/* Code Area */}
//           <div className="flex-1 p-4 text-xs font-mono text-gray-500 relative overflow-hidden">
//             <pre className="whitespace-pre-wrap text-gray-400">
//               {`import * as Button from './components/button';
// import {
//   RiArrowLeftSLine,
//   RiArrowRightSLine
// } from '@remixicon/react';

// export default function App() {
//   return (
//     <div className='flex min-h-screen flex-col items-center'>
//       <Button.Root variant='primary' mode='filled'>
//         <Button.Icon as={RiArrowLeftSLine} />
//         Learn More
//         <Button.Icon as={RiArrowRightSLine} />
//       </Button.Root>
//     </div>
//   );
// }`}
//             </pre>

//             {/* Overlay */}
//             <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center">
//               <div className="text-center">
//                 <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 text-xl shadow-inner">
//                   {"{ }"}
//                 </div>
//                 <p className="text-lg font-semibold text-gray-800">
//                   Try live editor
//                 </p>
//                 <p className="text-gray-500 text-sm mb-4">
//                   Click on the button to use the code editor
//                 </p>
//                 <button className="bg-black text-white px-4 py-2 rounded-full shadow hover:scale-105 transition">
//                   Try live
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
