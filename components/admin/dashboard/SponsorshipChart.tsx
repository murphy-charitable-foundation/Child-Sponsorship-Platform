import React, { useEffect, useState } from "react";
import {
	Pie,
	PieChart,
	PieLabelRenderProps,
	PieSectorShapeProps,
	Sector,
	useActiveTooltipDataPoints,
	useIsTooltipActive,
} from "recharts";

// #endregion
const RADIAN = Math.PI / 180;
const COLORS = [
	"#a4de6c",
	"#8884d8",
	"#ff8042",
	"#ffc658",
	"#82ca9d",
	"#0088fe",
	"#00c49f",
	"#d0ed57",
];

const renderCustomizedLabel = ({
	cx,
	cy,
	midAngle,
	innerRadius,
	outerRadius,
	value,
	name,
}: PieLabelRenderProps) => {
	if (cx == null || cy == null || innerRadius == null || outerRadius == null) {
		return null;
	}
	const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
	const ncx = Number(cx);
	const x = ncx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
	const ncy = Number(cy);
	const y = ncy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

	return (
		<text
			x={x}
			y={y}
			fill="white"
			textAnchor="middle"
		>
			<tspan
				x={x}
				dy="-0.3em"
			>
				{name}
			</tspan>
			<tspan
				x={x}
				dy="1.3em"
			>
				{value}
			</tspan>
		</text>
	);
};

const MyCustomPie = (props: PieSectorShapeProps) => {
	const p = useActiveTooltipDataPoints();
	const isAnyPieActive = useIsTooltipActive();
	const isThisPieActive = isAnyPieActive && props.payload === p?.[0];
	let fillOpacity: number;
	if (isAnyPieActive && !isThisPieActive) {
		fillOpacity = 0.5;
	} else {
		fillOpacity = 1;
	}
	return (
		<Sector
			{...props}
			fill={COLORS[props.index % COLORS.length]}
			fillOpacity={fillOpacity}
			style={{ transition: "fill-opacity 0.3s ease", outline: "none" }}
		/>
	);
};

export default function SponsorshipChart() {
	const [countryValue, setCountryValue] = useState<
		{
			name: string;
			value: number;
			fill: string;
		}[]
	>();

	useEffect(() => {
		async function fetchDonations() {
			try {
				const res = await fetch(`/api/supabase/sponsorships/active-count`);

				if (!res.ok) {
					console.error("Error fetching donations:", await res.text());
					return;
				}

				const { byCountry } = await res.json();
				setCountryValue(
					byCountry.map(
						(entry: { name: string; value: number }, index: number) => ({
							...entry,
							fill: COLORS[index % COLORS.length],
						}),
					),
				);
			} catch (err) {
				console.log("Failed to fetch donations:", err);
			}
		}
		fetchDonations();
	}, []);

	return (
		<PieChart
			style={{
				width: "100%",
				height: "100%",
				maxWidth: "500px",
				maxHeight: "80vh",
			}}
			responsive
		>
			<Pie
				data={countryValue}
				dataKey="value"
				nameKey="name"
				cx="50%"
				cy="50%"
				outerRadius="90%"
				shape={MyCustomPie}
				labelLine={false}
				label={renderCustomizedLabel}
				fill="#8884d8"
			/>
		</PieChart>
	);
}
