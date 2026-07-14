"use client";

import { Input, Select, SelectItem } from "@heroui/react";

type SponsorshipFilterProps = {
	selectedStatus: Set<string>;
	setSelectedStatus: (status: Set<string>) => void;
	selectedLocation: Set<string>;
	setSelectedLocation: (location: Set<string>) => void;
	selectedFrequency: Set<string>;
	setSelectedFrequency: (frequency: Set<string>) => void;
	searchQuery: string;
	setSearchQuery: (query: string) => void;
};

export default function SponsorshipFilter({
	selectedStatus,
	setSelectedStatus,
	selectedLocation,
	setSelectedLocation,
	selectedFrequency,
	setSelectedFrequency,
	searchQuery,
	setSearchQuery,
}: SponsorshipFilterProps) {
	const handleReset = () => {
		setSelectedStatus(new Set(["all"]));
		setSelectedLocation(new Set(["all"]));
		setSelectedFrequency(new Set(["all"]));
		setSearchQuery("");
	};

	return (
		<div className="bg-gray-100 p-6 rounded-md">
			<div className="space-y-3">
				<div className="flex gap-4">
					<div className="flex-1">
						<label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
							Search
						</label>
					</div>
					<div className="w-1/5">
						<label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
							Child Location
						</label>
					</div>
					<div className="w-1/5">
						<label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
							Frequency
						</label>
					</div>
					<div className="w-1/5">
						<label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
							Status
						</label>
					</div>
				</div>

				<div className="flex gap-4 items-end">
					<div className="flex-1">
						<Input
							aria-label="Search"
							placeholder="Search for sponsor or child"
							isClearable
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							onClear={() => setSearchQuery("")}
							className="w-full"
							classNames={{
								input: "bg-white text-gray-900 placeholder-gray-500",
								mainWrapper: "w-full",
								inputWrapper:
									"h-10 bg-white border-gray-200 hover:border-gray-300",
							}}
						/>
					</div>

					<div className="w-1/5">
						<Select
							aria-label="Child Location"
							selectedKeys={selectedLocation}
							onSelectionChange={(keys) => {
								const newKeys = new Set(Array.from(keys as Set<string>));

								// If "all" is selected, keep only "all"
								if (newKeys.has("all")) {
									setSelectedLocation(new Set(["all"]));
								}
								// If an individual location is clicked when "all" was selected, switch to just that location
								else if (newKeys.size > 0) {
									setSelectedLocation(newKeys);
								}
								// Allow empty selection
								else {
									setSelectedLocation(new Set());
								}
							}}
							className="w-full"
							classNames={{
								trigger: "h-10 bg-white border-gray-200 hover:border-gray-300",
							}}
							renderValue={(items) => (
								<span className="flex gap-2">
									{items.length === 0 ? (
										<span className="text-default-500">
											No location selected
										</span>
									) : items.some((item) => item.key === "all") ? (
										<span className="text-default-700">All locations</span>
									) : (
										items.map((item) => (
											<span key={item.key}>{item.textValue}</span>
										))
									)}
								</span>
							)}
						>
							<SelectItem key="all">All locations</SelectItem>
							<SelectItem key="uganda">Uganda</SelectItem>
							<SelectItem key="kenya">Kenya</SelectItem>
							<SelectItem key="tanzania">Tanzania</SelectItem>
							<SelectItem key="rwanda">Rwanda</SelectItem>
						</Select>
					</div>

					<div className="w-1/5">
						<Select
							aria-label="Frequency"
							selectedKeys={selectedFrequency}
							onSelectionChange={(keys) => {
								const newKeys = new Set(Array.from(keys as Set<string>));

								// If "all" is selected, keep only "all"
								if (newKeys.has("all")) {
									setSelectedFrequency(new Set(["all"]));
								}
								// If an individual frequency is clicked when "all" was selected, switch to just that frequency
								else if (newKeys.size > 0) {
									setSelectedFrequency(newKeys);
								}
								// Allow empty selection
								else {
									setSelectedFrequency(new Set());
								}
							}}
							className="w-full"
							classNames={{
								trigger: "h-10 bg-white border-gray-200 hover:border-gray-300",
							}}
							renderValue={(items) => (
								<span className="flex gap-2">
									{items.length === 0 ? (
										<span className="text-default-500">
											No frequency selected
										</span>
									) : items.some((item) => item.key === "all") ? (
										<span className="text-default-700">All frequencies</span>
									) : (
										items.map((item) => (
											<span key={item.key}>{item.textValue}</span>
										))
									)}
								</span>
							)}
						>
							<SelectItem key="all">All frequencies</SelectItem>
							<SelectItem key="monthly">Monthly</SelectItem>
							<SelectItem key="one-time">One-time</SelectItem>
							<SelectItem key="annual">Annual</SelectItem>
						</Select>
					</div>

					<div className="w-1/5">
						<Select
							aria-label="Status"
							selectedKeys={selectedStatus}
							onSelectionChange={(keys) => {
								const newKeys = new Set(Array.from(keys as Set<string>));

								// If "all" is selected, keep only "all"
								if (newKeys.has("all")) {
									setSelectedStatus(new Set(["all"]));
								}
								// If an individual status is clicked when "all" was selected, switch to just that status
								else if (newKeys.size > 0) {
									setSelectedStatus(newKeys);
								}
								// Allow empty selection
								else {
									setSelectedStatus(new Set());
								}
							}}
							className="w-full"
							classNames={{
								trigger: "h-10 bg-white border-gray-200 hover:border-gray-300",
							}}
							renderValue={(items) => (
								<span className="flex gap-2">
									{items.length === 0 ? (
										<span className="text-default-500">No status selected</span>
									) : items.some((item) => item.key === "all") ? (
										<span className="text-default-700">All statuses</span>
									) : (
										items.map((item) => (
											<span
												key={item.key}
												className={
													item.key === "active"
														? "text-success"
														: "text-default-500"
												}
											>
												{item.textValue}
											</span>
										))
									)}
								</span>
							)}
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
