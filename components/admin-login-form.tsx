"use client";

import { createClient } from "@/lib/supabase/client";
import { Button, Input, Link } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function AdminLoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
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
  };

  return (
    <form onSubmit={handleLogin}>
      <div className="flex flex-col gap-6">
        <div className="grid gap-2">
          <label htmlFor="admin-email" className="text-sm font-medium text-default-700">
            Email*
          </label>
          <Input
            id="admin-email"
            type="email"
            aria-label="Email"
            variant="bordered"
            radius="md"
            required
            value={email}
            classNames={{ inputWrapper: "rounded-[12px]" }}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <label htmlFor="admin-password" className="text-sm font-medium text-default-700">
            Password*
          </label>
          <Input
            id="admin-password"
            type="password"
            aria-label="Password"
            variant="bordered"
            radius="md"
            required
            value={password}
            classNames={{ inputWrapper: "rounded-[12px]" }}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex items-center">
            <Link
              href="/auth/forgot-password"
              className="inline-block text-sm underline-offset-4 hover:underline"
            >
              Forgot password?
            </Link>
          </div>
        </div>
        {error && <p className="text-sm text-danger">{error}</p>}
        <Button
          type="submit"
          color="primary"
          radius="md"
          className="rounded-[12px]"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </Button>
      </div>
    </form>
  );
}
