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

export type Child = {
	id: string;
	first_name: string;
	last_name: string;
	full_name: string;
	age: number;
	date_of_birth: string;
	gender: "Male" | "Female" | "Other";
	location: string;
	active: boolean;
	photo_path?: string;
	school_grade: number;
	created_at: string;
	favorite_activity: string;
	dream_job: string;
};
