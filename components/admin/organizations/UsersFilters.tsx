"use client";

import { Input, Select, SelectItem } from "@heroui/react";
import { filterInputCls, filterSelectCls } from "../shared/styleConstants";
import { USER_STATUS } from "@/lib/constants";
import { organizations } from "./AdminOrganizationsPage";

type ChildrenFiltersProps = {
	status: string;
	setStatus: (value: string) => void;
	organization: string;
	setOrganization: (value: string) => void;
	search: string;
	setSearch: (query: string) => void;
};

export default function UsersFilters({
	status,
	setStatus,
	organization,
	setOrganization,
	search,
	setSearch,
}: ChildrenFiltersProps) {
	const handleReset = () => {
		setStatus("all");
		setOrganization("all");
		setSearch("");
	};

	return (
		<div className="bg-gray-100 p-6">
			<div className="space-y-1">
				<div className="flex gap-5">
					<div className="flex-1">
						<label className="text-xs font-semibold text-gray-600 tracking-wider">
							Search
						</label>
					</div>
					<div className="w-1/5">
						<label className="text-xs font-semibold text-gray-600 tracking-wider">
							Organization
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
							placeholder="Search by first or last name"
							isClearable
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							onClear={() => setSearch("")}
							className="w-full"
							radius="none"
							classNames={filterInputCls}
						/>
					</div>

					<div className="w-1/5">
						<Select
							aria-label="Gender"
							disallowEmptySelection
							selectedKeys={[organization]}
							onChange={(e) => setOrganization(e.target.value)}
							className="w-full"
							radius="none"
							classNames={filterSelectCls}
						>
							{["all", ...organizations.map((o) => o.name)].map((g) => (
								<SelectItem key={g === "all" ? "all" : g.toLowerCase()}>
									{g === "all" ? "All organizations" : g}
								</SelectItem>
							))}
						</Select>
					</div>

					<div className="w-1/5">
						<Select
							aria-label="Status"
							disallowEmptySelection
							selectedKeys={[status]}
							onChange={(e) => setStatus(e.target.value)}
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
														: item.key === "pending"
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
							{["all", ...USER_STATUS].map((s) => (
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
