
"use client";

import React from "react";
import { Avatar, Button } from "@heroui/react";

export function AdminHeader() {
  return (
    <header className="sticky top-0 z-10 border-b border-default-200 bg-content1">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="text-lg font-semibold">Murphy Charitable</div>
        </div>

        <div className="flex items-center gap-3">
          <Button radius="md" variant="flat" color="primary">
            Help
          </Button>

          <div className="flex items-center gap-2">
            <Avatar
              size="sm"
              radius="md"
              name="Admin"
              className="bg-primary text-white"
            />
            <div className="text-sm text-default-600">admin</div>
          </div>
        </div>
      </div>
    </header>
  );
}
