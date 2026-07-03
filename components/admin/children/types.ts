export type GenderType = "Male" | "Female" | "Other";
export type StatusType = "Active" | "Waiting" | "Exited";
export type SponsorshipStatus = "Active" | "Inactive";

export type ChildBaseData = {
	id: string;
	first_name: string;
	last_name: string;
	age: number;
	gender: GenderType;
	location: string;
	status: StatusType;
	created_at: string;
};

export type Guardian = {
	name: string;
	relationship: string | null;
	nin: string | null;
	phone: string;
	email: string | null;
	address: string | null;
};

export type ChildProfile = {
	id: string;
	first_name: string;
	last_name: string;
	full_name: string;
	age: number;
	date_of_birth: string;
	gender: GenderType;
	location: string;
	status: StatusType;
	photo_path?: string;
	school_grade: number;
	created_at: string;
	favorite_activity: string;
	dream_job: string;
	biography: string | null;
	family_details: string | null;
	language: string | null;
	guardian_id: string;
	guardian_relationship: string | null;
	image_url?: string | null;
	guardian?: Guardian;
	sponsorship_status: SponsorshipStatus;
};
