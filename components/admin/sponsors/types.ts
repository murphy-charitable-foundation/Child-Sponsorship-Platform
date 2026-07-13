export type SponsorType =
	| "individual"
	| "family"
	| "company"
	| "ngo"
	| "religious";
export type SponsorStatus = "Active" | "Inactive";

export const SPONSOR_TYPE_LABELS: Record<SponsorType, string> = {
	individual: "Individual",
	family: "Family",
	company: "Company / Business",
	ngo: "Organization / NGO",
	religious: "Religious Institution",
};

export type SponsorTableData = {
	id: string;
	first_name: string;
	last_name: string;
	country: string;
	status: SponsorStatus;
	sponsor_type: SponsorType;
	group_name?: string;
	children_count?: number;
};

export type SponsorGroupTableData = {
	id: string;
	sponsor_type: SponsorType;
	group_name: string;
	country: string;
	status: SponsorStatus;
	children_count?: number;
};

export type SponsorProfile = {
	id: string;
	first_name: string;
	last_name: string;
	sponsor_type: SponsorType;
	group_name?: string | null;
	address_line1: string | null;
	address_line2?: string | null;
	city: string;
	state: string;
	zip: string;
	country: string;
	phone_number: string | null;
	email: string | null;
	job_title: string | null;
	image_url?: string | null;
	created_at: string;
	status: SponsorStatus;
};

export type SponsorGroup = {
	id: string;
	group_name: string;
	type: string;
	group_id: string;
	location: string;
	active: boolean;
	children_count: number;
};

export type CreateSponsor = {
	photo_file: File | null;
	first_name: string;
	last_name: string;
	sponsor_type: SponsorType | null;
	group_name?: string | null;
	address_line1: string | null;
	address_line2?: string | null;
	city: string;
	state: string;
	zip: string;
	country: string;
	phone_number: string | null;
	email: string | null;
	job_title: string | null;
};

export type EditSponsor = {
	id: string;
	photo_path?: string;
	first_name: string;
	last_name: string;
	sponsor_type: SponsorType | null;
	group_name?: string | null;
	address_line1: string | null;
	address_line2?: string | null;
	city: string;
	state: string;
	zip: string;
	country: string;
	phone_number: string | null;
	email: string | null;
	job_title: string | null;
};
