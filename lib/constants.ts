import {
	ChildStatus,
	ConsentMethod,
	GenderType,
} from "@/components/admin/children/types";
import { SponsorStatus, SponsorType } from "@/components/admin/sponsors/types";
import { Frequencies } from "@/components/admin/sponsorships/types";
import { Country, State } from "country-state-city";
import { useMemo } from "react";

export const COUNTRIES = Country.getAllCountries();

export function useStatesForCountry(countryName: string | null | undefined) {
	return useMemo(() => {
		const isoCode = COUNTRIES.find((c) => c.name === countryName)?.isoCode;
		return isoCode ? State.getStatesOfCountry(isoCode) : [];
	}, [countryName]);
}

export const ROLE_LABELS: Record<string, string> = {
	admin: "Admin",
	super_admin: "Super Admin",
	pending_admin: "Pending Admin",
	sponsor: "Sponsor",
};

// export const USER_STATUS: UserStatus[] = ["Active", "Pending"];
// export const REGIONS: Regions[] = ["Uganda", "Kenya", "Tanzania", "Rwanda"];

export const SPONSOR_TYPE_LABELS: Record<SponsorType, string> = {
	individual: "Individual",
	family: "Family",
	company: "Company / Business",
	ngo: "Organization / NGO",
	religious: "Religious Institution",
};

export const SPONSOR_GROUP_TYPES: { key: SponsorType; label: string }[] = [
	{ key: "family", label: "Family" },
	{ key: "company", label: "Company / Business" },
	{ key: "ngo", label: "Organization / NGO" },
	{ key: "religious", label: "Religious Institution" },
];

export const FREQUENCIES: Record<Frequencies, string> = {
	monthly: "Monthly",
	annual: "Annual",
	onetime: "One-time",
};

export const CHILD_COUNTRIES = ["Uganda", "Kenya", "Tanzania", "Rwanda"];
export const GENDERS: GenderType[] = ["Male", "Female", "Other"];
export const CHILD_STATUS: ChildStatus[] = ["Active", "Waiting", "Exited"];

export const CONSENT_METHOD: Record<ConsentMethod, string> = {
	InPerson: "In Person",
	Phone: "Phone",
};

export const SP_STATUS: SponsorStatus[] = ["Active", "Inactive"];

export const pageCapacities = ["10", "25", "50"];
