"use client";

import React, { useState } from "react";
import { Select, SelectItem, Input } from "@heroui/react";

interface SponsorsFilterProps {
	activeTab: "individuals" | "groups";
	onSearchChange?: (value: string) => void;
	onLocationChange?: (value: string) => void;
	onStatusChange?: (value: string) => void;
	onTypeChange?: (value: string) => void;
	onResetFilters?: () => void;
}

export function SponsorsFilter({
	activeTab,
	onSearchChange,
	// onLocationChange,
	onStatusChange,
	onTypeChange,
	onResetFilters,
}: SponsorsFilterProps) {
	const [search, setSearch] = useState("");
	// const [locationValue, setLocationValue] = useState("all");
	const [statusValue, setStatusValue] = useState("all");
	const [typeValue, setTypeValue] = useState("all");

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setSearch(value);
		onSearchChange?.(value);
	};

	// const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
	// 	const value = e.target.value;
	// 	setLocationValue(value);
	// 	onLocationChange?.(value);
	// };

	const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const value = e.target.value;
		setStatusValue(value);
		onStatusChange?.(value);
	};

	const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const value = e.target.value;
		setTypeValue(value);
		onTypeChange?.(value);
	};

	const handleReset = () => {
		setSearch("");
		setStatusValue("all");
		setTypeValue("all");
		onResetFilters?.();
	};

	const isGroupsTab = activeTab === "groups";

	return (
		<div className="bg-gray-100 p-6 rounded-md">
			<div className="space-y-3">
				<div className="flex gap-4">
					<div className={isGroupsTab ? "flex-1" : "flex-1"}>
						<label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
							Search
						</label>
					</div>
					{isGroupsTab && (
						<div className="w-1/5">
							<label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
								Type
							</label>
						</div>
					)}
					{/* <div className={isGroupsTab ? "w-1/5" : "w-1/4"}>
						<label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
							Location
						</label>
					</div> */}
					<div className={isGroupsTab ? "w-1/5" : "w-1/4"}>
						<label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
							Status
						</label>
					</div>
				</div>

				<div className="flex gap-4 items-end">
					<div className="flex-1">
						<Input
							placeholder={
								isGroupsTab
									? "Search by group name"
									: "Search by first or last name"
							}
							value={search}
							onChange={handleSearchChange}
							className="w-full"
							classNames={{
								input: "bg-white text-gray-900 placeholder-gray-500",
								mainWrapper: "w-full",
								inputWrapper:
									"h-10 bg-white border-gray-200 hover:border-gray-300",
							}}
						/>
					</div>

					{isGroupsTab && (
						<div className="w-1/5">
							<Select
								selectedKeys={[typeValue]}
								onChange={handleTypeChange}
								className="w-full"
								classNames={{
									trigger:
										"h-10 bg-white border-gray-200 hover:border-gray-300",
								}}
							>
								<SelectItem key="all">All types</SelectItem>
								<SelectItem key="company">Company</SelectItem>
								<SelectItem key="organization">Organization</SelectItem>
								<SelectItem key="religious">Religious</SelectItem>
							</Select>
						</div>
					)}

					{/* <div className={isGroupsTab ? "w-1/5" : "w-1/4"}> */}
					{/* <Select
							selectedKeys={[locationValue]}
							onChange={handleLocationChange}
							className="w-full"
							classNames={{
								trigger: "h-10 bg-white border-gray-200 hover:border-gray-300",
							}}
						>
							<SelectItem key="all">All locations</SelectItem>
							<SelectItem key="usa">USA</SelectItem>
							<SelectItem key="uk">UK</SelectItem>
							<SelectItem key="canada">Canada</SelectItem>
							<SelectItem key="australia">Australia</SelectItem>
							<SelectItem key="spain">Spain</SelectItem>
						</Select> */}
					{/* </div> */}

					<div className={isGroupsTab ? "w-1/5" : "w-1/4"}>
						<Select
							selectedKeys={[statusValue]}
							onChange={handleStatusChange}
							className="w-full"
							classNames={{
								trigger: "h-10 bg-white border-gray-200 hover:border-gray-300",
							}}
						>
							<SelectItem key="all">All statuses</SelectItem>
							<SelectItem key="active">Active</SelectItem>
							<SelectItem key="inactive">Inactive</SelectItem>
						</Select>
					</div>
				</div>
				<div className="flex-1 pt-2">
					<button
						onClick={handleReset}
						className="text-sm font-semibold text-blue-600 hover:underline cursor-pointer transition-all"
					>
						Reset filters
					</button>
				</div>
			</div>
		</div>
	);
}
