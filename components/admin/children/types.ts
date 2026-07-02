export type ChildProfile = {
	name: string;
	gender: string;
	dob: string;
	schoolLevel: string;
	country: string;
	language: string;
	biography: string;
	familyBiography: string;
	age: number;
	id: string;
	enrolled: string;
	sponsorshipStatus: string;
	imageUrl: string;
	guardian: {
		name: string;
		relationship: string;
		nin: string;
		phone: string;
		email: string;
		address: string;
	};
};

export type GenderType = "Male" | "Female" | "Other";
export type StatusType = "Active" | "Waiting" | "Exited";

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

export type Child = {
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
	guardian_id: string;
	guardian_relationship: string | null;
	image_url?: string;
};
