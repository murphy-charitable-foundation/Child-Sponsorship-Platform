"use client";

import { Input, Select, SelectItem } from "@heroui/react";

type ChildrenFiltersProps = {
	selectedStatus: Set<string>;
	setSelectedStatus: (status: Set<string>) => void;
	selectedGender: Set<string>;
	setSelectedGender: (gender: Set<string>) => void;
	searchQuery: string;
	setSearchQuery: (query: string) => void;
};

export default function ChildrenFilters({
	selectedStatus,
	setSelectedStatus,
	selectedGender,
	setSelectedGender,
	searchQuery,
	setSearchQuery,
}: ChildrenFiltersProps) {
	const handleReset = () => {
		setSelectedStatus(new Set(["all"]));
		setSelectedGender(new Set());
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
							Gender
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
							placeholder="Search by name"
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
							aria-label="Gender"
							selectedKeys={selectedGender}
							onSelectionChange={(keys) =>
								setSelectedGender(new Set(Array.from(keys as Set<string>)))
							}
							className="w-full"
							classNames={{
								trigger: "h-10 bg-white border-gray-200 hover:border-gray-300",
							}}
						>
							<SelectItem key="male">Male</SelectItem>
							<SelectItem key="female">Female</SelectItem>
							<SelectItem key="other">Other</SelectItem>
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
														: item.key === "waiting"
															? "text-warning"
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
							<SelectItem key="waiting">Waiting</SelectItem>
							<SelectItem key="exited">Exited</SelectItem>
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
