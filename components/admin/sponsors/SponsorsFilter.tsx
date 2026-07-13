"use client";

import React from "react";
import { Select, SelectItem, Input } from "@heroui/react";

interface SponsorsFilterProps {
	activeTab: "individuals" | "groups";
	searchValue: string;
	onSearchChange: (value: string) => void;
	locationValue: string;
	onLocationChange: (value: string) => void;
	statusValue: string;
	onStatusChange: (value: string) => void;
	typeValue: string;
	onTypeChange: (value: string) => void;
	onResetFilters: () => void;
}

export function SponsorsFilter({
	activeTab,
	searchValue,
	onSearchChange,
	locationValue,
	onLocationChange,
	statusValue,
	onStatusChange,
	typeValue,
	onTypeChange,
	onResetFilters,
}: SponsorsFilterProps) {
	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		onSearchChange(e.target.value);
	};

	const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		onLocationChange(e.target.value);
	};

	const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		onStatusChange(e.target.value);
	};

	const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		onTypeChange(e.target.value);
	};

	const handleReset = () => {
		onResetFilters();
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
					<div className={isGroupsTab ? "w-1/5" : "w-1/4"}>
						<label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
							Location
						</label>
					</div>
					<div className={isGroupsTab ? "w-1/5" : "w-1/4"}>
						<label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
							Status
						</label>
					</div>
				</div>

				<div className="flex gap-4 items-end">
					<div className="flex-1">
						<Input
							aria-label="Search"
							placeholder={
								isGroupsTab
									? "Search by group name"
									: "Search by first or last name"
							}
							value={searchValue}
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
								aria-label="Type"
								selectedKeys={[typeValue]}
								onChange={handleTypeChange}
								className="w-full"
								classNames={{
									trigger:
										"h-10 bg-white border-gray-200 hover:border-gray-300",
								}}
							>
								<SelectItem key="all">All types</SelectItem>
								<SelectItem key="family">Family</SelectItem>
								<SelectItem key="company">Company / Business</SelectItem>
								<SelectItem key="ngo">Organization / NGO</SelectItem>
								<SelectItem key="religious">Religious</SelectItem>
							</Select>
						</div>
					)}

					<div className={isGroupsTab ? "w-1/5" : "w-1/4"}>
						<Select
							aria-label="Location"
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
						</Select>
					</div>

					<div className={isGroupsTab ? "w-1/5" : "w-1/4"}>
						<Select
							aria-label="Status"
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
						className="text-sm font-semibold text-primary hover:underline cursor-pointer transition-all"
					>
						Reset filters
					</button>
				</div>
			</div>
		</div>
	);
}
