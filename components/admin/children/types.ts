export type GenderType = "Male" | "Female" | "Other";
export type StatusType = "Active" | "Waiting" | "Exited";
export type SponsorshipStatus = "Active" | "Inactive";
export type ConsentMethod = "InPerson" | "Phone";

export type ChildTableData = {
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
	id: string;
	full_name: string;
	relationship: string | null;
	nin: string | null;
	phone: string;
	email: string | null;
	address: string | null;
};

export type GuardianConsent = {
	id: string;
	full_name?: string;
	status: StatusType | null;
	consent_date?: string | null;
	consent_method?: ConsentMethod | null;
	homepage_visibility?: boolean;
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
	created_at: string;
	favorite_activity: string;
	dream_job: string;
	biography: string | null;
	family_biography: string | null;
	language: string | null;
	image_url?: string | null;
	guardian?: Guardian;
	sponsorship_status: SponsorshipStatus;
	homepage_visibility: boolean;
};

export type CreateChild = {
	photo_file: File | null;
	first_name: string;
	last_name: string;
	gender: GenderType | "";
	date_of_birth: string;
	location: string | "";
	language: string;
	dream_job: string | null;
	favorite_activity: string | null;
	biography: string;
	family_biography: string | null;
	guardian_relationship: string | null;
	guardian_name?: string;
	guardian_nin: string | null;
	guardian_phone: string;
	guardian_email: string | null;
	guardian_address: string | null;
};

export type EditChild = {
	id: string;
	first_name: string;
	last_name: string;
	gender: GenderType;
	date_of_birth: string;
	location: string | "";
	language: string;
	dream_job: string | null;
	favorite_activity: string | null;
	biography: string;
	photo_path?: string;
	family_biography: string | null;
	guardian_relationship: string | null;
	guardian_id?: string | null;
	guardian_name?: string;
	guardian_nin?: string | null;
	guardian_phone?: string;
	guardian_email?: string | null;
	guardian_address?: string | null;
};
