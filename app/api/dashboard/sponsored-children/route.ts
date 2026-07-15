import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

const BUCKET = "profiles";
const IMAGE_EXPIRY_SECONDS = 60 * 60;
const S3_PREFIX = "children/";

/* ---------------- types ---------------- */

type ChildRow = {
  id: string;
  first_name: string;
  last_name: string;
  date_of_birth: string | null;
  created_at: string | null;
  photo_path: string | null;
  yearly_expenses: number | null;
};

type PaymentRow = {
  payment_id: string;
  frequency_period: number;
  amount_value: number | string;
  currency_code: string;
  status: string;
  plan_type: string;
  created_at: string;
};

type SponsorshipRow = {
  sponsorship_id: string;
  amount: number;
  start_date_time: string;
  end_date_time: string | null;
  frequency_period: number;
  sponsorship_active: boolean | null;
  is_recurring: boolean;

  children: ChildRow[] | ChildRow;
  payments: PaymentRow[];
};

type SponsorRow = {
  sponsor_id: string;
  start_date_time: string | null;
  sponsorship_active: boolean | null;
  first_name: string | null;
  amount: number;
};

type SponsoredChild = {
  id: string;
  name: string;
  age: number | string;
  date: string | null;
  costs: number;
  frequencyPeriod: number;
  img: string | null;
  status: "Sponsoring" | "Stopped";
};

type RecentActivity = {
  payments: [string, number][];
  sponsorName: string;
  type: string;
};

/* ---------------- helpers ---------------- */

const calculateAge = (dob?: string | null): number => {
  if (!dob) return 0;

  const birth = new Date(dob);
  if (Number.isNaN(birth.getTime())) return 0;

  const now = new Date();

  let age = now.getFullYear() - birth.getFullYear();

  const notHadBirthdayThisYear =
    now.getMonth() < birth.getMonth() ||
    (now.getMonth() === birth.getMonth() && now.getDate() < birth.getDate());

  if (notHadBirthdayThisYear) age -= 1;

  return age;
};

const buildSignedUrlMap = async (
  supabase: ReturnType<typeof createAdminClient>,
  paths: string[],
) => {
  const map: Record<string, string> = {};

  if (!paths.length) return map;

  const { data, error } = await supabase.storage
    .from(BUCKET)
    .createSignedUrls(paths, IMAGE_EXPIRY_SECONDS);

  if (error) throw error;

  for (const item of data ?? []) {
    if (item.path && item.signedUrl) {
      map[item.path] = item.signedUrl;
    }
  }

  return map;
};

/* ---------------- handler ---------------- */

export async function GET() {
  const supabase = createAdminClient();

  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();

  // if (!user) {
  //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  // }

  const { data, error } = await supabase
    .from("sponsors")
    .select(
      `
      id,
      first_name,
      last_name,
      sponsor_type,

      sponsorships (
        sponsorship_id,
        amount,
        start_date_time,
        end_date_time,
        frequency_period,
        sponsorship_active,
        is_recurring,

        children (
          id,
          first_name,
          last_name,
          date_of_birth,
          photo_path,
          yearly_expenses,
          created_at
        ),

        payments (
          payment_id,
          amount_value,
          currency_code,
          status,
          plan_type,
          created_at
        )
      )
    `,
    )
    .eq("id", "ba3bbf2b-49ee-43f4-88eb-35ca7b40ee40"); //Replace with a real ID.
  // .eq("id", user.id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const sponsors = data ?? [];

  const sponsorships = sponsors.flatMap(
    (s) => s.sponsorships ?? [],
  ) as SponsorshipRow[];

  const childrenLastPayments = sponsorships.map(({ children, payments }) => ({
    childId: Array.isArray(children) ? children.at(-1)?.id : children.id,
    lastPaymentDate: payments.at(-1)?.created_at,
  }));

  const payments = sponsorships.flatMap((s) =>
    s.payments.map((payment) => ({
      ...payment,
      frequency: s.frequency_period,
    })),
  );

  const children: ChildRow[] = sponsorships.flatMap((s) => s.children ?? []);

  const photoPaths = children
    .map((c) => c.photo_path)
    .filter(
      (p): p is string => typeof p === "string" && p.startsWith(S3_PREFIX),
    );

  let signedUrls: Record<string, string> = {};

  try {
    signedUrls = await buildSignedUrlMap(supabase, photoPaths);
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Failed to generate image URLs";

    return NextResponse.json({ error: message }, { status: 500 });
  }

  const totalAmount = payments.reduce<number>(
    (sum, p) => sum + Number(p.amount_value),
    0,
  );

  const paymentsActivities: RecentActivity = {
    payments: payments
      .sort(
        (a, b) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
      )
      .slice(-4)
      .map(({ created_at, frequency }): [string, number] => [
        created_at,
        frequency,
      ]),
    sponsorName: [sponsors[0]?.first_name, sponsors[0]?.last_name]
      .filter(Boolean)
      .join(" "),
    type: "Payment",
  };

  const sponsorData = {
    sponsor_id: sponsors[0]?.id,
    start_date_time: sponsorships[0]?.start_date_time ?? null,
    sponsorship_active: sponsorships[0]?.sponsorship_active ?? null,
    first_name: sponsors[0]?.first_name,
    amount: +totalAmount.toFixed(2),
  };

  const result: {
    sponsorData: SponsorRow;
    children: SponsoredChild[];
    childrenLastPayments: {
      childId?: string;
      lastPaymentDate?: string;
    }[];
    activities: RecentActivity;
  } = {
    sponsorData,
    childrenLastPayments,
    activities: paymentsActivities,
    children: children.map((child, index): SponsoredChild => {
      const sponsorship = sponsorships[index];
      return {
        id: child.id,
        name: `${child.first_name} ${child.last_name}`,
        age: calculateAge(child.date_of_birth),
        date: child?.created_at ?? null,
        costs: sponsorship?.amount ?? 0,
        frequencyPeriod: sponsorship?.frequency_period ?? 0,
        img: child.photo_path ? (signedUrls[child.photo_path] ?? null) : null,
        status:
          sponsorship?.sponsorship_active === false ? "Stopped" : "Sponsoring",
      };
    }),
  };

  return NextResponse.json(result);
}
