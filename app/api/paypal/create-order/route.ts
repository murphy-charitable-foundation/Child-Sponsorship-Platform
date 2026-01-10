import { NextResponse } from "next/server";

type PlanType = "monthly" | "annual" | "onetime";

const planAmount: Record<PlanType, { value: string; currency: string }> = {
  monthly: { value: "39.00", currency: "USD" },
  annual: { value: "468.00", currency: "USD" },
  onetime: { value: "39.00", currency: "USD" },
};

async function getAccessToken() {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const secret = process.env.PAYPAL_CLIENT_SECRET;
  const baseUrl = process.env.PAYPAL_BASE_URL;

  if (!clientId || !secret || !baseUrl) {
    throw new Error("Missing PayPal env vars");
  }

  const auth = Buffer.from(`${clientId}:${secret}`).toString("base64");

  const res = await fetch(`${baseUrl}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  if (!res.ok) throw new Error("Failed to get PayPal access token");
  const data = await res.json();
  return data.access_token as string;
}

export async function POST(req: Request) {
  try {
    const { planType } = (await req.json()) as { planType: PlanType };

    if (!planType || !(planType in planAmount)) {
      return NextResponse.json({ error: "Invalid planType" }, { status: 400 });
    }

    const token = await getAccessToken();
    const baseUrl = process.env.PAYPAL_BASE_URL!;

    const amount = planAmount[planType];

    const orderRes = await fetch(`${baseUrl}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: amount.currency,
              value: amount.value,
            },
          },
        ],
      }),
    });

    const order = await orderRes.json();
    if (!orderRes.ok) {
      return NextResponse.json({ error: order }, { status: 500 });
    }

    return NextResponse.json({ id: order.id });
  } catch {
    return NextResponse.json({ error: "Create order failed" }, { status: 500 });
  }
}
