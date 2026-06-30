export interface Sponsor {
	id: string;
	first_name: string;
	last_name: string;
	sponsor_type: string;
	notes?: string;
	active: boolean;
	photo_path?: string;
	image_url?: string;
	location?: string;
	children_count?: number;
}

export interface SponsorGroup {
	id: string;
	group_name: string;
	type: string;
	group_id: string;
	location: string;
	active: boolean;
	children_count: number;
}
