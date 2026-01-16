"use client";

import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

type PlanType = "monthly" | "annual" | "onetime";

export default function PayPalCheckout({ planType, onPaymentError, }: { planType: PlanType; onPaymentError?: (message: string) => void;}) {
  
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

  if (!clientId) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "Missing NEXT_PUBLIC_PAYPAL_CLIENT_ID. PayPal disabled."
      );
    }
    return null;
  }

  return (
    <PayPalScriptProvider
      options={{
        clientId,
        currency: "USD",
        intent: "capture",
        components: "buttons",
        disableFunding: "card,credit,paylater,venmo",
      }}
    >
      <div className="w-full">
        <PayPalButtons
          fundingSource="paypal"
          style={{
            layout: "vertical",
            color: "blue",
            shape: "rect",
            label: "paypal",
            tagline: false,
            height: 44,
            borderRadius: 12,
          }}
          createOrder={async () => {
            const res = await fetch("/api/paypal/create-order", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ planType }),
            });

            if (!res.ok) throw new Error("Create order failed");
            const data = (await res.json()) as { id: string };
            return data.id;
          }}
          onApprove={async (data) => {
            const res = await fetch("/api/paypal/capture-order", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ orderId: data.orderID, planType }),
            });

            if (!res.ok) {
              onPaymentError?.("Payment failed. Please try again.");
              return;
            }
            window.location.href = "/sponsorship/success";
          }}
          onCancel={() => {
            onPaymentError?.("Payment was cancelled.");
          }}
          onError={(err) => {
            console.error("PayPal error:", err);
            onPaymentError?.("Payment failed. Please try again.");
          }}
        />
      </div>
    </PayPalScriptProvider>
  );
}
