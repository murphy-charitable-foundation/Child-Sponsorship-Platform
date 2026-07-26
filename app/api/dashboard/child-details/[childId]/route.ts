import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

const BUCKET = "profiles";
const IMAGE_EXPIRY_SECONDS = 60 * 60;
const S3_PREFIX = "children/";

type RouteContext = {
  params: Promise<{
    childId: string;
  }>;
};

type Donation = {
  id: string;
  date_time: string | null;
  amount: number | null;
  first_name: string | null;
  last_name: string | null;
};
type Sponsor = {
  donations: Donation[];
};
type Payment = {
  payment_id: string | null;
  amount_value: string | null;
  currency_code: string | null;
  status: string | null;
  plan_type: string | null;
  created_at: string | null;
};
type Sponsorship = {
  start_date_time: string | null;
  frequency_period: number | null;
  amount: number | null;
  payments: Payment[] | null;
  sponsors: Sponsor | null;
};
type Child = {
  first_name: string | null;
  last_name: string | null;
  date_of_birth: string | null;
  photo_path: string | null;
  status: string | null;
  location: string | null;
  notes: string | null;
  gender: string | null;
  school_grade: string | null;
  family_biography: string | null;
  sponsorships: Sponsorship[];
};
/* ---------------- helpers ---------------- */

const buildSignedUrlMap = async (
  supabase: ReturnType<typeof createAdminClient>,
  paths: string[],
) => {
  const map: Record<string, string> = {};

  if (!paths.length) return map;

  const { data, error } = await supabase.storage
    .from(BUCKET)
    .createSignedUrls(paths, IMAGE_EXPIRY_SECONDS);

  if (error) {
    throw error;
  }

  for (const item of data ?? []) {
    if (item.path && item.signedUrl) {
      map[item.path] = item.signedUrl;
    }
  }

  return map;
};

/* ---------------- handler ---------------- */

export async function GET(_req: Request, context: RouteContext) {
  try {
    const supabase = createAdminClient();

    const { childId } = await context.params;

    const { data, error } = await supabase
      .from("children")
      .select(
        `
        first_name,
        last_name,
        date_of_birth,
        photo_path,
        status,
        location,
        notes,
        gender,
        school_grade,
        family_biography,

        sponsorships (
          start_date_time,
          frequency_period,
          amount,

          payments (
            status,
            plan_type,
            payment_id,
            amount_value,
            currency_code,
            created_at
          ),
      
          sponsors (
            donations (
              id,
              date_time,
              amount,
              first_name,
              last_name)
          )
        )
      `,
      )
      .eq("id", childId)
      // .eq("id", "09e9731d-aa17-43de-a8e2-4f86ada1327b") //test
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data) {
      return NextResponse.json({ error: "Child not found" }, { status: 404 });
    }

    const Child = data as unknown as Child;

    const payments =
      Child.sponsorships?.flatMap(
        (sponsorship) => sponsorship.payments ?? [],
      ) ?? [];

    const totalAmount = payments.reduce(
      (sum, payment) =>
        payment.status === "COMPLETED"
          ? sum + Number(payment.amount_value ?? 0)
          : sum,
      0,
    );

    const sponsorshipDetails =
      Child.sponsorships?.map((sponsorship) => ({
        frequency_period: sponsorship.frequency_period,
        donations: sponsorship.sponsors?.donations ?? [],
      })) ?? [];
    const photoPaths: string[] = [];

    if (
      typeof Child.photo_path === "string" &&
      Child.photo_path.startsWith(S3_PREFIX)
    ) {
      photoPaths.push(Child.photo_path);
    }

    let signedUrls: Record<string, string> = {};

    try {
      signedUrls = await buildSignedUrlMap(supabase, [...new Set(photoPaths)]);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to generate image URLs";

      return NextResponse.json({ error: message }, { status: 500 });
    }

    const calculateAge = (dob?: string | null): number => {
      if (!dob) return 0;

      const birth = new Date(dob);
      if (Number.isNaN(birth.getTime())) return 0;

      const now = new Date();

      let age = now.getFullYear() - birth.getFullYear();

      const notHadBirthdayThisYear =
        now.getMonth() < birth.getMonth() ||
        (now.getMonth() === birth.getMonth() &&
          now.getDate() < birth.getDate());

      if (notHadBirthdayThisYear) age -= 1;

      return age;
    };

    const child = {
      ...Child,
      age: calculateAge(Child.date_of_birth),
      photo_url: Child.photo_path
        ? (signedUrls[Child.photo_path] ?? null)
        : null,
      totalAmount,
      donation: sponsorshipDetails,
    };

    return NextResponse.json({
      ...child,
    });
  } catch (error: unknown) {
    console.error("Unexpected error:", error);

    const message =
      error instanceof Error ? error.message : "Internal server error";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
