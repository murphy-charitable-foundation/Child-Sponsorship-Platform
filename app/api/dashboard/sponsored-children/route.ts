import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

const BUCKET = "profiles";
const IMAGE_EXPIRY_SECONDS = 60 * 60;
const S3_PREFIX = "children/";

/* ---------------- types ---------------- */
type Frequency = "annual" | "monthly" | "onetime";

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
  frequency: Frequency;
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
  frequency: Frequency;
  status: string | null;
  is_recurring: boolean;
  children: ChildRow[] | ChildRow;
  payments: PaymentRow[];
};

type SponsorRow = {
  sponsor_id: string;
  status: string | null;
  first_name: string | null;
  amount: number;
  daysSupporting: number;
};

type SponsoredChild = {
  id: string;
  name: string;
  age: number | string;
  date: string | null;
  costs: number;
  frequency: Frequency;
  img: string | null;
  status: "Sponsoring" | "Stopped";
};

type RecentActivity = {
  payments: [string, string][];
  sponsorName: string;
  type: string;
};

/* ---------------- helpers ---------------- */

const calculateAge = (dob?: string | null): number => {
  if (!dob) return 0;

  const birth = new Date(dob);

  if (Number.isNaN(birth.getTime())) {
    return 0;
  }

  const now = new Date();

  let age = now.getFullYear() - birth.getFullYear();

  const notHadBirthdayThisYear =
    now.getMonth() < birth.getMonth() ||
    (now.getMonth() === birth.getMonth() && now.getDate() < birth.getDate());

  if (notHadBirthdayThisYear) {
    age -= 1;
  }

  return age;
};

const calculateDaysSupporting = (sponsorships: SponsorshipRow[]): number => {
  if (!sponsorships.length) {
    return 0;
  }

  const activeSponsorships = sponsorships.filter(
    (sponsorship) => sponsorship.status?.toLowerCase() === "active",
  );

  let startDate: Date;
  let endDate: Date;

  if (activeSponsorships.length > 0) {
    const activeSponsorship = activeSponsorships.reduce((oldest, current) =>
      new Date(current.start_date_time).getTime() <
      new Date(oldest.start_date_time).getTime()
        ? current
        : oldest,
    );

    startDate = new Date(activeSponsorship.start_date_time);
    endDate = new Date();
  } else {
    const oldestSponsorship = sponsorships.reduce((oldest, current) =>
      new Date(current.start_date_time).getTime() <
      new Date(oldest.start_date_time).getTime()
        ? current
        : oldest,
    );

    const sponsorshipsWithEndDate = sponsorships.filter(
      (sponsorship) => sponsorship.end_date_time,
    );

    if (!sponsorshipsWithEndDate.length) {
      return 0;
    }

    const latestSponsorshipEndDate = sponsorshipsWithEndDate.reduce(
      (latest, current) =>
        new Date(current.end_date_time!).getTime() >
        new Date(latest.end_date_time!).getTime()
          ? current
          : latest,
    );

    startDate = new Date(oldestSponsorship.start_date_time);
    endDate = new Date(latestSponsorshipEndDate.end_date_time!);
  }

  if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) {
    return 0;
  }

  const millisecondsPerDay = 1000 * 60 * 60 * 24;

  return Math.max(
    0,
    Math.floor((endDate.getTime() - startDate.getTime()) / millisecondsPerDay),
  );
};

const buildSignedUrlMap = async (
  supabase: ReturnType<typeof createAdminClient>,
  paths: string[],
) => {
  const map: Record<string, string> = {};

  if (!paths.length) {
    return map;
  }

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

export async function GET() {
  const supabaseClient = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabaseClient.auth.getUser();

  if (authError || !user) {
    return NextResponse.json(
      {
        error: "Unauthorized",
        authError: authError?.message,
      },
      { status: 401 },
    );
  }

  const supabase = createAdminClient();

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
        frequency,
        status,
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
    // .eq("id", "ba3bbf2b-49ee-43f4-88eb-35ca7b40ee40");
  .eq("id", user.id);

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

  const payments = sponsorships.flatMap((sponsorship) =>
    sponsorship.payments.map((payment) => ({
      ...payment,
      frequency: sponsorship.frequency,
    })),
  );

  const children: ChildRow[] = sponsorships.flatMap(
    (sponsorship) => sponsorship.children ?? [],
  );

  const photoPaths = children
    .map((child) => child.photo_path)
    .filter(
      (path): path is string =>
        typeof path === "string" && path.startsWith(S3_PREFIX),
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
    (sum, payment) => sum + Number(payment.amount_value),
    0,
  );

  const daysSupporting = calculateDaysSupporting(sponsorships);

  const paymentsActivities: RecentActivity = {
    payments: payments
      .sort(
        (a, b) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
      )
      .slice(-4)
      .map(({ created_at, frequency }): [string, string] => [
        created_at,
        frequency,
      ]),
    sponsorName: [sponsors[0]?.first_name, sponsors[0]?.last_name]
      .filter(Boolean)
      .join(" "),
    type: "Payment",
  };

  const sponsorData: SponsorRow = {
    sponsor_id: sponsors[0]?.id,
    status: sponsorships[0]?.status ?? null,
    first_name: sponsors[0]?.first_name,
    amount: +totalAmount.toFixed(2),
    daysSupporting,
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
        date: child.created_at ?? null,
        costs: sponsorship?.amount ?? 0,
        frequency: sponsorship?.frequency,
        img: child.photo_path ? (signedUrls[child.photo_path] ?? null) : null,
        status:
          sponsorship?.status?.toLowerCase() === "inactive"
            ? "Stopped"
            : "Sponsoring",
      };
    }),
  };

  return NextResponse.json(result);
}
