"use client";

import { createClient } from "@/lib/supabase/client";
import {
  Checkbox,
  Input,
  Select,
  SelectItem,
  Button,
  Divider,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const sponsorOptions = [
  { key: "individual", label: "Individual" },
  { key: "family", label: "Family" },
  { key: "company", label: "Company / Business" },
  { key: "ngo", label: "Organization / NGO" },
  { key: "religious", label: "Religious Institution" },
];

export function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [sponsorType, setSponsorType] = useState<string>("individual");
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
          data: {
            role: "sponsor",
            sponsor_type: sponsorType,
            first_name: firstName,
            last_name: lastName,
            active: true,
          },
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
    <form onSubmit={handleSignUp}>
      <div className="flex flex-col gap-6">
        <div className="grid gap-2">
          <label
            htmlFor="sponsor-type"
            className="text-sm font-medium text-default-700"
          >
            Sponsor Type*
          </label>
          <Select
            id="sponsor-type"
            aria-label="Sponsor Type"
            placeholder="Select sponsor type"
            variant="bordered"
            radius="md"
            selectedKeys={[sponsorType]}
            onSelectionChange={(keys) => {
              if (keys === "all") return;

              const value = Array.from(keys)[0] as string;
              setSponsorType(value);
            }}
            classNames={{
              trigger: "rounded-[12px]",
            }}
            defaultSelectedKeys={["individual"]}
          >
            {sponsorOptions.map((opt) => (
              <SelectItem
                key={opt.key}
                classNames={{
                  selectedIcon: "hidden",
                }}
              >
                {opt.label}
              </SelectItem>
            ))}
          </Select>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="grid gap-2">
            <label
              htmlFor="sponsor-first-name"
              className="text-sm font-medium text-default-700"
            >
              First Name*
            </label>
            <Input
              id="sponsor-first-name"
              aria-label="First Name"
              variant="bordered"
              radius="md"
              required
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              classNames={{ inputWrapper: "rounded-[12px]" }}
            />
          </div>
          <div className="grid gap-2">
            <label
              htmlFor="sponsor-last-name"
              className="text-sm font-medium text-default-700"
            >
              Last Name*
            </label>
            <Input
              id="sponsor-last-name"
              aria-label="Last Name"
              variant="bordered"
              radius="md"
              required
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              classNames={{ inputWrapper: "rounded-[12px]" }}
            />
          </div>
        </div>

        <div className="grid gap-2">
          <label
            htmlFor="sponsor-sign-up-email"
            className="text-sm font-medium text-default-700"
          >
            Email*
          </label>
          <Input
            id="sponsor-sign-up-email"
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
          <label
            htmlFor="sponsor-phone-number"
            className="text-sm font-medium text-default-700"
          >
            Phone Number*
          </label>
          <Input
            id="sponsor-phone-number"
            type="tel"
            aria-label="Phone Number"
            variant="bordered"
            radius="md"
            required
            value={phone}
            classNames={{ inputWrapper: "rounded-[12px]" }}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <Divider />

        <div className="grid gap-2">
          <label
            htmlFor="sponsor-sign-up-password"
            className="text-sm font-medium text-default-700"
          >
            Password*
          </label>
          <Input
            id="sponsor-sign-up-password"
            type="password"
            aria-label="Password"
            variant="bordered"
            radius="md"
            required
            value={password}
            classNames={{ inputWrapper: "rounded-[12px]" }}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="grid gap-2">
          <label
            htmlFor="sponsor-repeat-password"
            className="text-sm font-medium text-default-700"
          >
            Repeat Password*
          </label>
          <Input
            id="sponsor-repeat-password"
            type="password"
            aria-label="Repeat Password"
            variant="bordered"
            radius="md"
            required
            value={repeatPassword}
            classNames={{ inputWrapper: "rounded-[12px]" }}
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
        </div>

        {error && <p className="text-sm text-danger">{error}</p>}
        <Checkbox id="terms" required>
          <p className="text-sm">I agree to the Terms of Use and Privacy Policy</p>
        </Checkbox>
        <Button
          type="submit"
          color="primary"
          radius="md"
          className="rounded-[12px]"
          disabled={isLoading}
        >
          {isLoading ? "Creating an account..." : "Sign up"}
        </Button>
      </div>
    </form>
  );
}
