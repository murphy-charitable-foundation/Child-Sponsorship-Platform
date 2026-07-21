"use client";

import { createClient } from "@/lib/supabase/client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  //const [org, setOrg] = useState("Uganda");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const supabase = createClient();

    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: username,
        password,
      });

      if (error) throw error;

      const role = data.user?.app_metadata?.role;
      const adminRoles = new Set(["admin", "super_admin"]);

      if (role === "pending_admin") {
        router.push("/auth/pending-approval");
        router.refresh();
        return;
      }

      if (!role || !adminRoles.has(String(role).toLowerCase())) {
        await supabase.auth.signOut();
        setError("This account does not have admin access.");
        return;
      }

      router.push("/admin/dashboard");
      router.refresh();
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "Unable to sign in");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-primary px-5 py-10">
      <div className="w-full max-w-md rounded-[20px] bg-content1 px-8 py-10 shadow-xl sm:px-10">
        <div className="flex justify-center">
          <Image
            src="/children/logo.png"
            alt="Murphy Charitable Foundation"
            width={104}
            height={104}
            priority
          />
        </div>

        <h1 className="mt-6 text-center text-2xl font-semibold text-primary">
          Admin Portal
        </h1>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          {/*<div>
            <label
              htmlFor="admin-organization"
              className="mb-2 block text-sm font-medium text-default-500"
            >
              Organization
            </label>
            <select
              id="admin-organization"
              value={org}
              onChange={(e) => setOrg(e.target.value)}
              className={`${inputCls} bg-default-100`}
            >
              <option>Uganda</option>
              <option>Kenya</option>
              <option>Tanzania</option>
              <option>Rwanda</option>
            </select>
          </div>*/}

          <div>
            <label
              htmlFor="admin-username"
              className="mb-2 block text-sm font-medium text-default-500"
            >
              Username
            </label>
            <input
              id="admin-username"
              type="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={inputCls}
              autoComplete="email"
              required
            />
          </div>

          <div>
            <label
              htmlFor="admin-password"
              className="mb-2 block text-sm font-medium text-default-500"
            >
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputCls}
              autoComplete="current-password"
              required
            />
          </div>

          {error && (
            <p className="rounded-lg bg-danger-50 px-3 py-2 text-sm text-danger">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="h-12 w-full rounded-[12px] bg-primary text-base font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="mt-7 text-center">
          <Link
            href="/auth/forgot-password"
            className="text-sm font-medium text-default-400 hover:text-default-600 hover:underline"
          >
            Forgot password?
          </Link>
        </div>
      </div>
    </div>
  );
}

const inputCls =
  "h-12 w-full rounded-[12px] border border-default-200 bg-content1 px-4 text-base text-default-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20";
