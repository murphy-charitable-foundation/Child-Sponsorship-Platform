import { SponsorType } from "@/components/admin/sponsors/types";
import { Frequencies } from "@/components/admin/sponsorships/types";

export const SPONSOR_TYPE_LABELS: Record<SponsorType, string> = {
	individual: "Individual",
	family: "Family",
	company: "Company / Business",
	ngo: "Organization / NGO",
	religious: "Religious Institution",
};

export const FREQUENCIES: Record<Frequencies, string> = {
	monthly: "Monthly",
	annual: "Annual",
	onetime: "One-time",
};

export const ROLE_LABELS: Record<string, string> = {
	admin: "Admin",
	super_admin: "Super Admin",
	pending_admin: "Pending Admin",
	sponsor: "Sponsor",
};
