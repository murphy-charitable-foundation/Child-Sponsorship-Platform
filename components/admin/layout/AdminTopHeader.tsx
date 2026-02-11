"use client";

import React from "react";
//import Image from "next/image";

export function AdminTopHeader() {
  return (
    <header className="h-16 bg-content1 border-b border-default-200">
      <div className="h-full px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/*<Image src="/logo.png" alt="Murphy Charitable" width={36} height={36} />*/}
          <div className="font-semibold text-default-800">
            MURPHY CHARITABLE
            <br />
            FOUNDATION USA
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="font-semibold text-default-800">admin_username</div>
          <span className="text-default-500">▾</span>
        </div>
      </div>
    </header>
  );
}
