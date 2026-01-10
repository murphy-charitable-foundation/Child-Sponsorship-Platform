"use client";

import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import {
  Tabs,
  Tab,
  Card,
  CardBody,
  CardHeader,
  Input,
  Select,
  SelectItem,
  Textarea,
  Button,
  Link,
  Divider,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
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
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      // Update this route to redirect to an authenticated route. The user already has an active session.
      router.push("/protected");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="">

          <form onSubmit={handleLogin}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Input
                  id="email"
                  type="email"
                  label="Email*"
                  labelPlacement="outside"
                  variant="bordered"
                  radius="md"
                  required
                  value={email}
                  classNames={{ inputWrapper: "rounded-[12px]" }}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                
                <Input
                  id="password"
                  type="password"
                  label="Password*"
                  labelPlacement="outside"
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
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button type="submit" 
                color="primary" 
                radius="md" 
                className="rounded-[12px]" 
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </div>
            
          </form>
    </div>
  );
}
