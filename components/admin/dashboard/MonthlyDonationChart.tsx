import React from "react";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
} from "recharts";
import { DonationTableData } from "../donations/types";

type Props = {
	donations: DonationTableData[];
};

export default function MonthlyDonationChart({ donations }: Props) {
	const now = new Date();
	const monthKeys = Array.from({ length: 12 }, (_, i) => {
		const d = new Date(now.getFullYear(), now.getMonth() - (12 - i), 1);
		return d.toLocaleString("default", { month: "short", year: "numeric" });
	});

	const monthlyTotals = new Map<string, number>(monthKeys.map((m) => [m, 0]));

	donations.forEach((d) => {
		const month = new Date(d.date_time).toLocaleString("default", {
			month: "short",
			year: "numeric",
		});
		if (monthlyTotals.has(month)) {
			monthlyTotals.set(month, monthlyTotals.get(month)! + d.amount);
		}
	});

	const data = monthKeys.map((month) => ({
		month,
		Amount: monthlyTotals.get(month)!,
	}));

	return (
		<BarChart
			style={{
				width: "100%",
				maxWidth: "700px",
				maxHeight: "70vh",
				aspectRatio: 1.618,
			}}
			responsive
			data={data}
			margin={{
				top: 5,
				right: 0,
				left: 10,
				bottom: 5,
			}}
		>
			<CartesianGrid strokeDasharray="3 3" />
			<XAxis
				dataKey="month"
				tick={{ fontSize: 10 }}
			/>
			<YAxis
				width={35}
				tick={{ fontSize: 10 }}
			/>
			<Tooltip
				cursor={false}
				formatter={(value) => `$${value}`}
			/>
			<Legend />
			<Bar
				dataKey="Amount"
				fill="#8884d8"
				activeBar={{ fill: "pink", stroke: "blue" }}
				barSize={20}
			/>
		</BarChart>
	);
}
