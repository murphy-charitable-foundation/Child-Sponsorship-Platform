"use client";

import { Input, Select, SelectItem } from "@heroui/react";
import { filterInputCls, filterSelectCls } from "../shared/styleConstants";
import { CHILD_COUNTRIES, FREQUENCIES, SP_STATUS } from "@/lib/constants";

type SponsorshipFilterProps = {
	selectedStatus: string;
	setSelectedStatus: (status: string) => void;
	selectedLocation: string;
	setSelectedLocation: (location: string) => void;
	selectedFrequency: string;
	setSelectedFrequency: (frequency: string) => void;
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
		setSelectedStatus("all");
		setSelectedLocation("all");
		setSelectedFrequency("all");
		setSearchQuery("");
	};

	return (
		<div className="bg-gray-100 p-6 ">
			<div className="space-y-3">
				<div className="flex gap-5">
					<div className="flex-1">
						<label className="text-xs font-semibold text-gray-600 tracking-wider">
							Search
						</label>
					</div>
					<div className="w-1/5">
						<label className="text-xs font-semibold text-gray-600 tracking-wider">
							Child Location
						</label>
					</div>
					<div className="w-1/5">
						<label className="text-xs font-semibold text-gray-600 tracking-wider">
							Frequency
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
							placeholder="Search for sponsor or child"
							isClearable
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							onClear={() => setSearchQuery("")}
							radius="none"
							classNames={filterInputCls}
						/>
					</div>

					<div className="w-1/5">
						<Select
							aria-label="Child Location"
							disallowEmptySelection
							selectedKeys={[selectedLocation]}
							onChange={(e) => setSelectedLocation(e.target.value)}
							className="w-full"
							radius="none"
							classNames={filterSelectCls}
						>
							{["all", ...CHILD_COUNTRIES].map((c) => (
								<SelectItem key={c === "all" ? "all" : c.toLowerCase()}>
									{c === "all" ? "All locations" : c}
								</SelectItem>
							))}
						</Select>
					</div>

					<div className="w-1/5">
						<Select
							aria-label="Frequency"
							disallowEmptySelection
							selectedKeys={[selectedFrequency]}
							onChange={(e) => setSelectedFrequency(e.target.value)}
							className="w-full"
							radius="none"
							classNames={filterSelectCls}
						>
							{[
								["all", "All frequencies"],
								...Object.entries(FREQUENCIES).filter(
									([key]) => key !== "individual",
								),
							].map(([key, label]) => (
								<SelectItem key={key}>{label}</SelectItem>
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
														: "text-warning"
												}
											>
												{item.textValue}
											</span>
										))
									)}
								</span>
							)}
						>
							{["all", ...SP_STATUS].map((s) => (
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
