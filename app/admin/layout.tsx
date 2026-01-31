// app/admin/layout.tsx
import React from "react";
import { AdminSidebar } from "@/components/admin/layout/AdminSidebar";
import AdminTopActions from "@/components/admin/layout/AdminTopActions";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-default-50">
      <div className="flex min-h-screen">
        <AdminSidebar />

        <div className="flex-1 px-6 py-6">
          {/* Top-right actions (shows on ALL admin pages) */}
          <div className="flex justify-end mb-6">
            <AdminTopActions />
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}
