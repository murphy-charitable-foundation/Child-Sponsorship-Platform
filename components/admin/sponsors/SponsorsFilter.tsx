"use client";

import { Select, SelectItem, Input } from "@heroui/react";
import { filterInputCls, filterSelectCls } from "../shared/styleConstants";
import { SP_STATUS, SPONSOR_TYPE_LABELS } from "@/lib/constants";

interface SponsorsFilterProps {
	activeTab: "individuals" | "groups";
	searchValue: string;
	setSearchValue: (value: string) => void;
	locationValue: string;
	setLocationValue: (value: string) => void;
	statusValue: string;
	setStatusValue: (value: string) => void;
	typeValue: string;
	setTypeValue: (value: string) => void;
	countries: Set<string>;
}

export function SponsorsFilter({
	activeTab,
	searchValue,
	setSearchValue,
	locationValue,
	setLocationValue,
	statusValue,
	setStatusValue,
	typeValue,
	setTypeValue,
	countries,
}: SponsorsFilterProps) {
	const isGroupsTab = activeTab === "groups";

	function handelReset() {
		setSearchValue("");
		setLocationValue("all");
		setStatusValue("all");
		setTypeValue("all");
	}

	return (
		<div className="bg-gray-100 p-5">
			<div className="space-y-1">
				<div className="flex gap-5">
					<div className={isGroupsTab ? "flex-1" : "flex-1"}>
						<label className="text-xs font-semibold text-gray-600 tracking-wider">
							Search
						</label>
					</div>
					{isGroupsTab && (
						<div className="w-1/5">
							<label className="text-xs font-semibold text-gray-600 tracking-wider">
								Type
							</label>
						</div>
					)}
					<div className={isGroupsTab ? "w-1/5" : "w-1/4"}>
						<label className="text-xs font-semibold text-gray-600 tracking-wider">
							Location
						</label>
					</div>
					<div className={isGroupsTab ? "w-1/5" : "w-1/4"}>
						<label className="text-xs font-semibold text-gray-600 tracking-wider">
							Status
						</label>
					</div>
				</div>

				<div className="flex gap-6 mt-2 items-end">
					<div className="flex-1">
						<Input
							aria-label="Search"
							placeholder={
								isGroupsTab
									? "Search by group name"
									: "Search by first or last name"
							}
							value={searchValue}
							onChange={(e) => setSearchValue(e.target.value)}
							className="w-full"
							radius="none"
							classNames={filterInputCls}
						/>
					</div>

					{isGroupsTab && (
						<div className="w-1/5">
							<Select
								aria-label="Type"
								disallowEmptySelection
								selectedKeys={[typeValue]}
								onChange={(e) => setTypeValue(e.target.value)}
								radius="none"
								className="w-full"
								classNames={filterSelectCls}
							>
								{[
									["all", "All types"],
									...Object.entries(SPONSOR_TYPE_LABELS).filter(
										([key]) => key !== "individual",
									),
								].map(([key, label]) => (
									<SelectItem key={key}>{label}</SelectItem>
								))}
							</Select>
						</div>
					)}

					<div className={isGroupsTab ? "w-1/5" : "w-1/4"}>
						<Select
							aria-label="Location"
							disallowEmptySelection
							selectedKeys={[locationValue]}
							onChange={(e) => setLocationValue(e.target.value)}
							className="w-full"
							radius="none"
							classNames={filterSelectCls}
						>
							{["all", ...countries].map((c) => (
								<SelectItem key={c === "all" ? "all" : c.toLowerCase()}>
									{c === "all" ? "All locations" : c}
								</SelectItem>
							))}
						</Select>
					</div>

					<div className={isGroupsTab ? "w-1/5" : "w-1/4"}>
						<Select
							aria-label="Status"
							disallowEmptySelection
							selectedKeys={[statusValue]}
							onChange={(e) => setStatusValue(e.target.value)}
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
						onClick={handelReset}
						className="text-sm font-semibold text-primary hover:underline cursor-pointer transition-all"
					>
						Reset filters
					</button>
				</div>
			</div>
		</div>
	);
}
