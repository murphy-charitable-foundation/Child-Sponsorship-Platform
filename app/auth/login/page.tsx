"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: authenticate with Supabase
    console.log("Sponsor Login:", { username, password });
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-primary">
      <div className="w-full max-w-sm rounded-2xl bg-white px-8 py-10 shadow-xl">

        {/* Logo */}
        <div className="flex justify-center">
          <Image
            src="/children/logo.png"
            alt="Murphy Charitable Foundation"
            width={96}
            height={96}
          />
        </div>

        {/* Title */}
        <h1 className="mt-3 text-center text-lg font-semibold text-primary">
          Sponsor Portal
        </h1>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">

          {/* Username */}
          <div>
            <label className="mb-1 block text-xs text-slate-500">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={inputCls}
              autoComplete="username"
            />
          </div>

          {/* Password */}
          <div>
            <label className="mb-1 block text-xs text-slate-500">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputCls}
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            className="mt-2 w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
          >
            Sign In
          </button>
        </form>

        <div className="mt-4 text-center">
          <Link
            href="/auth/forgot-password"
            className="text-xs text-slate-400 hover:text-slate-600 hover:underline"
          >
            Forgot password?
          </Link>
        </div>
      </div>
    </div>
  );
}

const inputCls =
  "w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20";
