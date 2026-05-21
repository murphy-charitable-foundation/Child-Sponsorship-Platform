"use client";
import { useState } from "react";
import { Input, Select, SelectItem, Button } from "@heroui/react";
import type { Selection } from "@heroui/react";

export type ChildFilters = {
	search: string;
	gender: string;
	statuses: Set<string>;
};

const DEFAULT_FILTERS: ChildFilters = {
	search: "",
	gender: "",
	statuses: new Set(["active", "waiting", "exited"]),
};

type Props = {
	onFiltersChange: (filters: ChildFilters) => void;
};

export default function ChildrenFilters({ onFiltersChange }: Props) {
	const [search, setSearch] = useState(DEFAULT_FILTERS.search);
	const [gender, setGender] = useState(DEFAULT_FILTERS.gender);
	const [statuses, setStatuses] = useState<Set<string>>(
		new Set(DEFAULT_FILTERS.statuses),
	);

	function handleSearchChange(value: string) {
		setSearch(value);
		onFiltersChange({ search: value, gender, statuses });
	}

	function handleGenderChange(keys: Selection) {
		const value = keys === "all" ? "" : ([...keys][0]?.toString() ?? "");
		setGender(value);
		onFiltersChange({ search, gender: value, statuses });
	}

	function handleStatusesChange(keys: Selection) {
		const next =
			keys === "all"
				? new Set(["active", "waiting", "exited"])
				: new Set([...keys].map(String));
		setStatuses(next);
		onFiltersChange({ search, gender, statuses: next });
	}

	function handleReset() {
		setSearch(DEFAULT_FILTERS.search);
		setGender(DEFAULT_FILTERS.gender);
		setStatuses(new Set(DEFAULT_FILTERS.statuses));
		onFiltersChange({
			...DEFAULT_FILTERS,
			statuses: new Set(DEFAULT_FILTERS.statuses),
		});
	}

	return (
		<div className="w-full">
			<div className="grid grid-cols-1 gap-4 lg:grid-cols-12 items-end">
				{/* Search */}
				<div className="lg:col-span-6">
					<div className="mb-1 text-sm font-medium text-default-700">
						Who are you looking for?
					</div>
					<Input
						placeholder=""
						radius="md"
						variant="bordered"
						isClearable
						value={search}
						onValueChange={handleSearchChange}
					/>
				</div>

				{/* Gender */}
				<div className="lg:col-span-3">
					<div className="mb-1 text-sm font-medium text-default-700">
						Gender
					</div>
					<Select
						placeholder="Select gender"
						radius="md"
						variant="bordered"
						selectedKeys={gender ? new Set([gender]) : new Set()}
						onSelectionChange={handleGenderChange}
					>
						<SelectItem key="all">All</SelectItem>
						<SelectItem key="male">Male</SelectItem>
						<SelectItem key="female">Female</SelectItem>
						<SelectItem key="other">Other</SelectItem>
					</Select>
				</div>

				{/* Status */}
				<div className="lg:col-span-3">
					<div className="mb-1 text-sm font-medium text-default-700">
						Status
					</div>
					<Select
						radius="md"
						variant="bordered"
						selectionMode="multiple"
						selectedKeys={statuses}
						onSelectionChange={handleStatusesChange}
						renderValue={() => (
							<span>
								{[...statuses].map((s, i) => (
									<span key={s}>
										{i > 0 && ", "}
										<span
											className={
												s === "active"
													? "text-success"
													: s === "waiting"
														? "text-warning"
														: "text-default-500"
											}
										>
											{s.charAt(0).toUpperCase() + s.slice(1)}
										</span>
									</span>
								))}
							</span>
						)}
					>
						<SelectItem key="active">Active</SelectItem>
						<SelectItem key="waiting">Waiting</SelectItem>
						<SelectItem key="exited">Exited</SelectItem>
					</Select>
				</div>
			</div>

			{/* Reset filters */}
			<div className="mt-3 flex justify-end">
				<Button
					variant="light"
					size="sm"
					className="text-primary font-medium"
					onPress={handleReset}
				>
					Reset filters
				</Button>
			</div>
		</div>
	);
}
