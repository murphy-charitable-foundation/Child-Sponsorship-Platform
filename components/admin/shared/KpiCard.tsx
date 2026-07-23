"use client";

import { Card, CardBody } from "@heroui/react";

type KpiCardProps = {
	title: string;
	value: number | string;
};

export function KpiCard({ title, value }: KpiCardProps) {
	return (
		<Card
			radius="md"
			className="bg-white shadow-md"
		>
			<CardBody className="py-8 flex flex-col items-center justify-center text-center">
				<div className="text-xl font-medium text-default-900">{title}</div>
				<div className="mt-2 text-2xl font-semibold text-slate-800">
					{value}
				</div>
			</CardBody>
		</Card>
	);
}
