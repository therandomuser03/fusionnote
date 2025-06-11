import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Main Layout',
  description: 'Layout for the main section of the app',
};

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 text-black">
      {/* Add navigation, sidebar, etc. if needed */}
      {children}
    </div>
  );
}
