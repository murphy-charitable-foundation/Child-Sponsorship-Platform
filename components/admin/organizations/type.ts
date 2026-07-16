export type UserStatus = "Active" | "Pending";
export type Role = "Admin" | "Super Admin" | "Pending Admin";
export type Regions = "Uganda" | "Kenya" | "Tanzania" | "Rwanda";

export type User = {
	id: string;
	last_name: string;
	first_name: string;
	email: string;
	organization: Regions | null;
	role: Role;
	status: UserStatus;
	last_active: string | null;
	image_url?: string | null;
};

export type CreateUser = {
	first_name: string;
	last_name: string;
	email: string;
	role: Role | null;
	regions: Regions | null;
};

export type EditUser = {
	id: string;
	photo_path?: string;
	first_name: string;
	last_name: string;
	email: string;
	role: Role | null;
	regions: Regions | null;
	status?: UserStatus;
};
