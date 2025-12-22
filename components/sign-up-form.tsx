"use client";

import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import {
  Tabs,
  Tab,
  Card,
  CardBody,
  CardHeader,
  Checkbox,
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

export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    if (password !== repeatPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/protected`,
        },
      });
      if (error) throw error;
      router.push("/auth/sign-up-success");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10">
      <h1 className="text-center text-2xl font-semibold">
          Create Account
      </h1>
      <Divider />
      <Card className="mt-6 rounded-[12px] border border-default-200 shadow-none">
        <CardBody>
          <form onSubmit={handleSignUp}>
            <h2 className="text-center text-xl text-default-500">
                Personal Information
            </h2>
      <Divider />
            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Input
                  id="first-name"
                  label="First Name*"
                  labelPlacement="outside"
                  variant="bordered"
                  radius="md"
                  required
                  classNames={{ inputWrapper: "rounded-[12px]" }}
                />
                <Input
                  id="last-name"
                  label="Last Name*"
                  labelPlacement="outside"
                  variant="bordered"
                  radius="md"
                  required
                  classNames={{ inputWrapper: "rounded-[12px]" }}
                />
              </div>
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
                  id="phone-number"
                  label="Phone Number*"
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

                <h2 className="text-center text-xl text-default-500">
                    Create Password
                </h2>
                <Divider />
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
              </div>
              <div className="grid gap-2">

                <Input
                  id="repeat-password"
                  type="password"
                  label="Repeat Password*"
                  labelPlacement="outside"
                  variant="bordered"
                  radius="md"
                  required
                  value={repeatPassword}
                  classNames={{ inputWrapper: "rounded-[12px]" }}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Checkbox
                id="terms"
                required
              >
                <p className="text-sm">I agree to the Terms of Use and Privacy Policy</p>
              </Checkbox>
             <Button type="submit" 
                color="primary" 
                radius="md" 
                className="rounded-[12px]" 
                disabled={isLoading}
              >
                {isLoading ? "Creating an account..." : "Sign up"}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link href="/auth/login" className="underline underline-offset-4 text-sm">
                Login
              </Link>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
