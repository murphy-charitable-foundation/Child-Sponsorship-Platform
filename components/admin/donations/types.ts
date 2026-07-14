import { Frequencies } from "../sponsorships/types";

export type DonationTableData = {
	id: string;
	user_id: string;
	first_name: string;
	last_name: string;
	amount: number;
	date_time: Date;
	purpose: string | null;
	country: string | null;
};

export type Donation = {
	id: string;
	amount: number;
	date_time: Date;
	payment_method: string;
	purpose: string | null;
	frequency: string | null;
	user_id: string;
	first_name: string;
	last_name: string;
	country: string | null;
	email: string | null;
	phone_number: string | null;
};

export const frequencies: Record<Frequencies, string> = {
	monthly: "Monthly",
	annual: "Annual",
	onetime: "One-time",
};
