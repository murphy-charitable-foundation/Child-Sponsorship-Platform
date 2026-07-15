import { NextResponse } from "next/server";
import { createClient as createSupabaseServerClient } from "@/lib/supabase/server";
import { Frequencies } from "@/components/admin/sponsorships/types";

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
		const { orderId, planType } = (await req.json()) as {
			orderId: string;
			planType?: Frequencies;
		};

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
			},
		);

		const capture = await captureRes.json();
		if (!captureRes.ok) {
			return NextResponse.json({ error: capture }, { status: 500 });
		}

		const status = capture?.status as string | undefined;
		if (status !== "COMPLETED") {
			return NextResponse.json({ capture }, { status: 200 });
		}

		const purchaseUnit = capture?.purchase_units?.[0];
		const captureItem = purchaseUnit?.payments?.captures?.[0];

		const amount = captureItem?.amount ??
			purchaseUnit?.amount ?? {
				value: "",
				currency_code: "",
			};

		const providerCaptureId = captureItem?.id ?? null;
		const amountValue = amount?.value ?? "";
		const currencyCode = amount?.currency_code ?? "";

		const payerEmail = capture?.payer?.email_address ?? null;
		const payerId = capture?.payer?.payer_id ?? null;
		const supabase = await createSupabaseServerClient();
		const { data: userData, error: userErr } = await supabase.auth.getUser();

		if (userErr || !userData?.user?.id) {
			return NextResponse.json(
				{ error: "User not authenticated for persistence", capture },
				{ status: 401 },
			);
		}

		const userId = userData.user.id;
		const paymentMethodId = 1;

		const validatedPlanType: Frequencies | null =
			planType && ["monthly", "annual", "onetime"].includes(planType)
				? planType
				: null;

		const { error: dbError } = await supabase.from("payments").upsert(
			{
				user_id: userId,
				sponsorship_id: null, // add after sponsorship_id is passed through
				donation_id: null, // add after sponsor_id mapping exists and we create donations
				payment_method_id: paymentMethodId,
				provider: "paypal",
				provider_order_id: orderId,
				provider_capture_id: providerCaptureId,
				status,
				amount_value: String(amountValue),
				currency_code: String(currencyCode),
				plan_type: validatedPlanType,
				payer_email: payerEmail,
				payer_id: payerId,
				raw: capture,
			},
			{ onConflict: "provider,provider_order_id" },
		);

		if (dbError) {
			return NextResponse.json(
				{
					error: "Payment captured but DB insert failed",
					details: dbError.message,
				},
				{ status: 500 },
			);
		}

		return NextResponse.json({ capture });
	} catch {
		return NextResponse.json({ error: "Capture failed" }, { status: 500 });
	}
}
