'use client';

import Link from 'next/link';
import React from 'react';

export default function AppHeader() {
  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div className="text-xl font-bold">FusionNote</div>
      <ul className="flex space-x-6">
        <li>
          <Link href="/" className="hover:text-gray-300 transition-colors duration-200">
            Home
          </Link>
        </li>
        <li>
          <Link href="/about" className="hover:text-gray-300 transition-colors duration-200">
            About
          </Link>
        </li>
        <li>
          <Link href="/contact" className="hover:text-gray-300 transition-colors duration-200">
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
}
