export type DonationTableData = {
	id: string;
	user_id: string;
	first_name: string;
	last_name: string;
	amount: number;
	date_time: Date;
	purpose: string;
	country: string;
};

export type Donation = {
	id: string;
	amount: number;
	date_time: Date;
	payment_method: string;
	purpose: string | null;
	first_name: string;
	last_name: string;
	country: string | null;
	email: string | null;
};
