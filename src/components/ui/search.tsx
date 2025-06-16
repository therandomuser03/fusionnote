'use client';

import { SearchIcon } from "lucide-react";

export default function Search({ placeholder }: { placeholder: string }) {
  function handleSearch(term: string) {
    console.log(term);
  }
 
  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
      />
      <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center space-x-2">
        <SearchIcon className="h-[18px] w-[18px] text-gray-500 peer-focus:text-gray-900" />
        <span className="text-sm text-gray-500 peer-focus:text-gray-900">Quick search...</span>
      </div>
    </div>
  );
}