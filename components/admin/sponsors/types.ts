export type SponsorType =
	| "individual"
	| "family"
	| "company"
	| "ngo"
	| "religious";
export type SponsorStatus = "Active" | "Inactive";

export type SponsorTableData = {
	id: string;
	first_name: string;
	last_name: string;
	country: string;
	status: SponsorStatus;
	sponsor_type: SponsorType;
	group_name?: string;
};

export type SponsorGroupTableData = {
	id: string;
	sponsor_type: SponsorType;
	group_name: string;
	country: string;
	status: SponsorStatus;
};

export type Sponsor = {
	id: string;
	first_name: string;
	last_name: string;
	sponsor_type: SponsorType;
	notes?: string;
	active: boolean;
	photo_path?: string;
	image_url?: string;
	location?: string;
	children_count?: number;
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
