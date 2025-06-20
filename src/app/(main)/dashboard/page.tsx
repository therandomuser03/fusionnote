import AppContent from "@/components/layout/AppContent";
import AppFooter from "@/components/layout/AppFooter";
import AppHeader from "@/components/layout/AppHeader";
import AppNavbar from "@/components/layout/AppNavbar";
import React from "react";

export default function Dashboard() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Sticky top navbar */}
      <div className="sticky top-0 z-50">
        <AppNavbar />
      </div>

      <AppHeader />

      {/* Main content should grow to fill space */}
      <div className="flex-grow pt-16 pb-16">
        <AppContent />
      </div>

      {/* Footer always at bottom */}
      <AppFooter />
    </div>
  );
}
