"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardBody,
  Input,
  Button,
} from "@heroui/react";

type PaymentType = "card" | "paypal";

export default function PaymentInformationPage() {
  const router = useRouter();
  const [paymentType, setPaymentType] = React.useState<PaymentType>("paypal");

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto w-full max-w-5xl px-4 py-10">
        <h1 className="text-center text-2xl font-semibold">Payment Information</h1>
        <div className="mt-3 h-px w-full bg-default-200" />

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-[1fr_280px]">
          <div>
            <Card className="rounded-[12px] border border-default-200 shadow-none">
              <CardBody className="p-5">
                <div className="flex items-center gap-3 text-sm">
                  <span className="inline-flex items-center justify-center rounded-[12px] border border-default-200 px-3 py-1 text-xs">
                    [LOCK]
                  </span>
                  <span className="text-foreground">Secure SSL Encrypted Payment</span>
                </div>
              </CardBody>
            </Card>

            <div className="mt-8">
              <h2 className="text-base font-semibold">Payment Method</h2>

              <div className="mt-3 flex gap-3">

                <Button
                    radius="md"
                    className="rounded-[12px]"
                    disableAnimation
                    variant={paymentType === "paypal" ? "solid" : "bordered"}
                    color={paymentType === "paypal" ? "primary" : "default"}
                    onPress={() => setPaymentType("paypal")}
                >
                    PayPal
                </Button>

                <Button
                    radius="md"
                    className="rounded-[12px]"
                    disableAnimation
                    variant={paymentType === "card" ? "solid" : "bordered"}
                    color={paymentType === "card" ? "primary" : "default"}
                    onPress={() => setPaymentType("card")}
                    isDisabled={true}
                >
                    Other (coming soon)
                </Button>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-base font-semibold">Card Information</h2>

              <div className="mt-4 grid grid-cols-1 gap-4">
                <Input
                  label="Card Number*"
                  labelPlacement="outside"
                  placeholder="Input"
                  variant="bordered"
                  radius="md"
                  classNames={{ inputWrapper: "rounded-[12px]" }}
                  isDisabled={paymentType !== "card"}
                />

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Input
                    label="Expiry*"
                    labelPlacement="outside"
                    placeholder="MM/YY"
                    variant="bordered"
                    radius="md"
                    classNames={{ inputWrapper: "rounded-[12px]" }}
                    isDisabled={paymentType !== "card"}
                  />
                  <Input
                    label="CVC*"
                    labelPlacement="outside"
                    placeholder="Input"
                    variant="bordered"
                    radius="md"
                    classNames={{ inputWrapper: "rounded-[12px]" }}
                    isDisabled={paymentType !== "card"}
                  />
                </div>

                {paymentType === "paypal" && (
                  <p className="text-sm text-default-500">
                    You’ll be redirected to PayPal to complete your payment.
                  </p>
                )}
              </div>
            </div>
            <div className="mt-10 flex items-center justify-between">
              <Button
                variant="bordered"
                radius="md"
                className="rounded-[12px]"
                onPress={() => router.push("/sponsorship/complete")}
              >
                ← Back
              </Button>

              <Button
                color="primary"
                radius="md"
                className="rounded-[12px]"
                onPress={() => {
                  // placeholder for now, later this should submit payment + finalize sponsorship
                }}
              >
                Complete Sponsorship
              </Button>
            </div>
          </div>

          <div>
            <Card className="rounded-[12px] border border-default-200 shadow-none">
              <CardBody className="p-5">
                <h3 className="text-sm font-semibold">Sponsorship Summary</h3>
                <div className="mt-3 h-px w-full bg-default-200" />

                <div className="mt-4 space-y-4 text-sm">
                  <div>
                    <p className="text-default-500">Child Name</p>
                    <p className="font-medium">Maria Rodriguez</p>
                  </div>

                  <div>
                    <p className="text-default-500">Sponsorship Plan</p>
                    <p className="font-medium">Monthly</p>
                  </div>

                  <div className="h-px w-full bg-default-200" />

                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-semibold">Amount</p>
                    </div>
                    <p className="font-medium">$39.00/month</p>
                  </div>

                  <p className="text-xs text-default-500">
                    You will be charged $39.00 today and on the same day each month thereafter.
                  </p>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
