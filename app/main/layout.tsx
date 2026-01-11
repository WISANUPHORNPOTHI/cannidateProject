"use client";

import { useState } from "react";
import { Sidebar } from "../components/layout/Sidebar";
import { Navbar } from "../components/layout/Navbar";
import { ContentWrapper } from "../components/layout/ContentWrapper";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar
        open={sidebarOpen}
        setIsSidebarOpen={setSidebarOpen}
      />

      <div className="flex-1 flex flex-col">
        <Navbar
          sidebarOpen={sidebarOpen}
          onToggleSidebar={() =>
            setSidebarOpen(!sidebarOpen)
          }
        />

        <main className="flex-1 p-4">
          <ContentWrapper>
            {children}
          </ContentWrapper>
        </main>
      </div>
    </div>
  );
}
