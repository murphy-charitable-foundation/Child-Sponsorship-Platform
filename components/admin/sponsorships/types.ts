import { SponsorStatus } from "../sponsors/types";

export type Frequencies = "monthly" | "annual" | "onetime";

export type Sponsorship = {
	sponsorship_id: string;
	sponsor_name: string;
	sponsor_id: string;
	child_name: string;
	child_id: string;
	child_location: string;
	amount: number;
	frequency: Frequencies;
	status: SponsorStatus;
	start_date_time: Date;
	end_date_time: Date | null;
};

export type CreateSponsorship = {
	sponsor_id: string;
	child_id: string;
	amount: number | string | null;
	frequency: Frequencies | "";
	start_date: string;
	end_date: string | null;
};

export type EditSponsorship = {
	sponsorship_id: string;
	amount: number | string | null;
	frequency: Frequencies | "";
	start_date: string;
	end_date: string | null;
};
