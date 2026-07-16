"use client";

import { Input, Select, SelectItem } from "@heroui/react";
import { filterInputCls, filterSelectCls } from "../shared/styleConstants";
import { CHILD_STATUS, GENDERS } from "@/lib/constants";

type ChildrenFiltersProps = {
	selectedStatus: string;
	setSelectedStatus: (value: string) => void;
	selectedGender: string;
	setSelectedGender: (value: string) => void;
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
		setSelectedStatus("all");
		setSelectedGender("all");
		setSearchQuery("");
	};

	return (
		<div className="bg-gray-100 p-6">
			<div className="space-y-3">
				<div className="flex gap-5">
					<div className="flex-1">
						<label className="text-xs font-semibold text-gray-600 tracking-wider">
							Search
						</label>
					</div>
					<div className="w-1/5">
						<label className="text-xs font-semibold text-gray-600 tracking-wider">
							Gender
						</label>
					</div>
					<div className="w-1/5">
						<label className="text-xs font-semibold text-gray-600 tracking-wider">
							Status
						</label>
					</div>
				</div>

				<div className="flex gap-6 items-end">
					<div className="flex-1">
						<Input
							aria-label="Search"
							placeholder="Search by name"
							isClearable
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							onClear={() => setSearchQuery("")}
							className="w-full"
							radius="none"
							classNames={filterInputCls}
						/>
					</div>

					<div className="w-1/5">
						<Select
							aria-label="Gender"
							disallowEmptySelection
							selectedKeys={[selectedGender]}
							onChange={(e) => setSelectedGender(e.target.value)}
							className="w-full"
							radius="none"
							classNames={filterSelectCls}
						>
							{["all", ...GENDERS].map((g) => (
								<SelectItem key={g === "all" ? "all" : g.toLowerCase()}>
									{g === "all" ? "All genders" : g}
								</SelectItem>
							))}
						</Select>
					</div>

					<div className="w-1/5">
						<Select
							aria-label="Status"
							disallowEmptySelection
							selectedKeys={[selectedStatus]}
							onChange={(e) => setSelectedStatus(e.target.value)}
							className="w-full"
							radius="none"
							classNames={filterSelectCls}
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
							{["all", ...CHILD_STATUS].map((s) => (
								<SelectItem key={s === "all" ? "all" : s.toLowerCase()}>
									{s === "all" ? "All statuses" : s}
								</SelectItem>
							))}
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
