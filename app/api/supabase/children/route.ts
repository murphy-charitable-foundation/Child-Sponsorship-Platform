import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/supabase/require-admin";
import {
	createChild,
	getChildren,
	updateChild,
} from "@/lib/supabase/queries/children";
import { CreateChild } from "@/components/admin/children/types";

function validate(data: CreateChild): string | null {
	if (!data.first_name?.trim()) return "First name is required.";
	if (!data.last_name?.trim()) return "Last name is required.";
	if (!data.gender) return "Gender is required.";
	if (!data.date_of_birth) return "Date of birth is required.";
	if (!data.location?.trim()) return "Country is required.";
	return null;
}

export async function GET(req: NextRequest): Promise<NextResponse> {
	const supabase = await createClient();
	const adminResult = await requireAdmin(supabase);

	if (adminResult.error === "unauthorized") {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}
	if (adminResult.error === "forbidden") {
		return NextResponse.json({ error: "Forbidden" }, { status: 403 });
	}
	const { userRole, region } = adminResult;

	const statuses = req.nextUrl.searchParams.get("status")?.split(",");

	try {
		const data = await getChildren(userRole, region, statuses);

		return NextResponse.json({ children: data }, { status: 200 });
	} catch (err) {
		return NextResponse.json(
			{ error: err instanceof Error ? err.message : "Failed to get children" },
			{ status: 500 },
		);
	}
}

export async function POST(req: NextRequest): Promise<NextResponse> {
	const supabase = await createClient();
	const { error: authError } = await requireAdmin(supabase);

	if (authError === "unauthorized") {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}
	if (authError === "forbidden") {
		return NextResponse.json({ error: "Forbidden" }, { status: 403 });
	}

	const data = await req.json();

	if (!data) {
		return NextResponse.json(
			{ error: "Invalid request data" },
			{ status: 400 },
		);
	}

	const validationError = validate(data);

	if (validationError) {
		return NextResponse.json({ error: validationError }, { status: 400 });
	}

	try {
		const childId = await createChild(data);

		return NextResponse.json({ id: childId }, { status: 201 });
	} catch (err) {
		return NextResponse.json(
			{ error: err instanceof Error ? err.message : "Failed to create child" },
			{ status: 500 },
		);
	}
}

export async function PATCH(req: NextRequest): Promise<NextResponse> {
	const supabase = await createClient();
	const { error: authError } = await requireAdmin(supabase);

	if (authError === "unauthorized") {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}
	if (authError === "forbidden") {
		return NextResponse.json({ error: "Forbidden" }, { status: 403 });
	}

	const data = await req.json();

	if (!data) {
		return NextResponse.json(
			{ error: "Invalid request data" },
			{ status: 400 },
		);
	}

	const validationError = validate(data);

	if (validationError) {
		return NextResponse.json({ error: validationError }, { status: 400 });
	}

	try {
		const childId = await updateChild(data);
		return NextResponse.json({ childId });
	} catch (err) {
		return NextResponse.json(
			{ error: err instanceof Error ? err.message : "Failed to update child" },
			{ status: 500 },
		);
	}
}
