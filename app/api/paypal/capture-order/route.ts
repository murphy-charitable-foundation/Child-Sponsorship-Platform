import { NextResponse } from "next/server";

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
    const { orderId } = (await req.json()) as { orderId: string };
    if (!orderId) {
      return NextResponse.json({ error: "Missing orderId" }, { status: 400 });
    }

    const token = await getAccessToken();
    const baseUrl = process.env.PAYPAL_BASE_URL!;

    const captureRes = await fetch(
      `${baseUrl}/v2/checkout/orders/${orderId}/capture`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const capture = await captureRes.json();
    if (!captureRes.ok) {
      return NextResponse.json({ error: capture }, { status: 500 });
    }

    // Phase 2: insert payment + update sponsorship in DB here
    return NextResponse.json({ capture });
  } catch {
    return NextResponse.json({ error: "Capture failed" }, { status: 500 });
  }
}
