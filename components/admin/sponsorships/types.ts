export type Frequencies = "monthly" | "annual" | "onetime";

export type Sponsorship = {
	sponsorship_id: string;
	sponsor_name: string;
	child_name: string;
	child_location: string;
	amount: number;
	frequency: Frequencies;
	sponsorship_active: boolean;
	start_date_time: Date;
	end_date_time: Date | null;
};

export type CreateSponsorship = {
	sponsorId: string;
	childId: string;
	amount: number | string;
	frequency: Frequencies;
	startDate: string;
	endDate: string | null;
};
