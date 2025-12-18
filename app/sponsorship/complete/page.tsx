"use client";

import React from "react";
import { useRouter } from "next/navigation";


import {
  Tabs,
  Tab,
  Card,
  CardBody,
  Input,
  Select,
  SelectItem,
  Textarea,
  Button,
} from "@heroui/react";

type PlanType = "monthly" | "annual" | "onetime";

const sponsorOptions = [
  { key: "individual", label: "Individual" },
  { key: "family", label: "Family" },
  { key: "company", label: "Company / Business" },
  { key: "ngo", label: "Organization / NGO" },
  { key: "religious", label: "Religious Institution" },
];


const planPrice: Record<PlanType, { value: string; suffix: string }> = {
  monthly: { value: "$39", suffix: "/month" },
  annual: { value: "$468", suffix: "/year" },
  onetime: { value: "$39", suffix: "" },
};

export default function CompleteSponsorshipPage() {
  const router = useRouter();
  const [planType, setPlanType] = React.useState<PlanType>("monthly");

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto w-full max-w-3xl px-4 py-10">
        <h1 className="text-center text-2xl font-semibold">
          Complete Your Sponsorship
        </h1>
        <div className="mt-3 h-px w-full bg-default-200" />

        <div className="mt-8">
            <p className="mb-3 text-sm text-foreground">Select Sponsorship Plan</p>

            <Tabs
                selectedKey={planType}
                onSelectionChange={(key) => setPlanType(key as PlanType)}
                variant="bordered"
                radius="md"
                color="primary"
                disableAnimation
                classNames={{
                    base: "w-full",
                    tabList:
                    "w-full grid grid-cols-3 rounded-[12px] border border-default-200 p-0",
                    tab:
                    "h-12 w-full",
                    tabContent: "group-data-[selected=true]:text-white",
                }}
            >
                <Tab key="monthly" title="Monthly" />
                <Tab key="annual" title="Annual" />
                <Tab key="onetime" title="One-time" />
            </Tabs>
        </div>

        <Card className="mt-6 rounded-[12px] border border-default-200 shadow-none">
          <CardBody className="p-6">
            <h2 className="text-lg font-semibold">Registration Information</h2>

            <div className="mt-5 grid grid-cols-1 gap-4">
              <Select
                label="Sponsor Type*"
                labelPlacement="outside"
                placeholder="Select sponsor type"
                variant="bordered"
                radius="md"
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
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Input
                  label="First Name*"
                  labelPlacement="outside"
                  placeholder="Input"
                  variant="bordered"
                  radius="md"
                  classNames={{ inputWrapper: "rounded-[12px]" }}
                />
                <Input
                  label="Last Name*"
                  labelPlacement="outside"
                  placeholder="Input"
                  variant="bordered"
                  radius="md"
                  classNames={{ inputWrapper: "rounded-[12px]" }}
                />
              </div>

              <Input
                label="Email Address*"
                labelPlacement="outside"
                placeholder="Input"
                type="email"
                variant="bordered"
                radius="md"
                classNames={{ inputWrapper: "rounded-[12px]" }}
              />

              <Input
                label="Phone"
                labelPlacement="outside"
                placeholder="Input"
                type="tel"
                variant="bordered"
                radius="md"
                classNames={{ inputWrapper: "rounded-[12px]" }}
              />

              {planType !== "onetime" && (
                <>
                  <Input
                    label="Password*"
                    labelPlacement="outside"
                    placeholder="Input"
                    type="password"
                    variant="bordered"
                    radius="md"
                    classNames={{ inputWrapper: "rounded-[12px]" }}
                  />

                  <Input
                    label="Confirm Password*"
                    labelPlacement="outside"
                    placeholder="Input"
                    type="password"
                    variant="bordered"
                    radius="md"
                    classNames={{ inputWrapper: "rounded-[12px]" }}
                  />

                  <Textarea
                    label="Billing Address*"
                    labelPlacement="outside"
                    placeholder="Textarea"
                    variant="bordered"
                    radius="md"
                    minRows={4}
                    classNames={{
                      inputWrapper: "rounded-[12px]",
                    }}
                  />
                </>
              )}
            </div>
          </CardBody>
        </Card>

        <Card className="mt-6 rounded-[12px] border border-default-200 shadow-none">
          <CardBody className="p-6">
            <div className="flex items-start justify-between gap-6">
              <div>
                <h3 className="text-sm font-semibold">Sponsorship Summary</h3>
                <div className="mt-3 text-sm">
                  <p className="font-medium">Maria Rodriguez</p>
                  <p className="text-default-500">Age: 8 • Guatemala</p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-xl font-semibold">
                  {planPrice[planType].value}
                  <span className="text-base font-normal text-default-500">
                    {planPrice[planType].suffix}
                  </span>
                </p>
              </div>
            </div>
          </CardBody>
        </Card>

        <div className="mt-8 flex items-center justify-between">
          <Button
            variant="bordered"
            radius="md"
            className="rounded-[12px]"
            onPress={() => router.back()}
          >
            ← Back
          </Button>

          <Button
            color="primary"
            radius="md"
            className="rounded-[12px]"
            onPress={() => router.push("/sponsorship/payment")}
          >
            Continue to Payment
          </Button>
        </div>
      </div>
    </main>
  );
}
