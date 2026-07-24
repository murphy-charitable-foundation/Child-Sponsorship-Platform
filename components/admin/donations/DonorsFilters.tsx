import { Input, Select, SelectItem } from "@heroui/react";
import { filterInputCls, filterSelectCls } from "../shared/styleConstants";

type DonationsFilterProps = {
	selectedCountry: string;
	setSelectedCountry: (country: string) => void;
	searchQuery: string;
	setSearchQuery: (query: string) => void;
	selectedPurpose: string;
	setSelectedPurpose: (query: string) => void;
	countries: Set<string | null>;
	purposes: Set<string | null>;
};

export default function DonorsFilters({
	selectedCountry,
	setSelectedCountry,
	searchQuery,
	setSearchQuery,
	selectedPurpose,
	setSelectedPurpose,
	countries,
	purposes,
}: DonationsFilterProps) {
	const handleReset = () => {
		setSelectedCountry("all");
		setSearchQuery("");
	};

	return (
		<div className="bg-gray-100 p-5">
			<div className="space-y-1">
				<div className="flex gap-4">
					<div className="flex-1">
						<label className="text-xs font-semibold text-gray-600 tracking-wider">
							Search
						</label>
					</div>
					<div className="w-1/3">
						<label className="text-xs font-semibold text-gray-600 tracking-wider">
							Country
						</label>
					</div>
					<div className="w-1/3">
						<label className="text-xs font-semibold text-gray-600 tracking-wider">
							Purpose
						</label>
					</div>
				</div>

				<div className="flex gap-6 items-end">
					<div className="flex-1">
						<Input
							aria-label="Search"
							placeholder="Search donors..."
							isClearable
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							onClear={() => setSearchQuery("")}
							className="w-full"
							radius="none"
							classNames={filterInputCls}
						/>
					</div>

					<div className="w-1/3">
						<Select
							aria-label="Country"
							selectedKeys={[selectedCountry]}
							onChange={(e) => setSelectedCountry(e.target.value)}
							className="w-full"
							radius="none"
							classNames={filterSelectCls}
						>
							{["all", ...countries].map((c) => (
								<SelectItem key={c === "all" ? "all" : c?.toLowerCase()}>
									{c === "all" ? "All locations" : c}
								</SelectItem>
							))}
						</Select>
					</div>
					<div className="w-1/3">
						<Select
							aria-label="Purpose"
							selectedKeys={[selectedPurpose]}
							onChange={(e) => setSelectedPurpose(e.target.value)}
							className="w-full"
							radius="none"
							classNames={filterSelectCls}
						>
							{["all", ...purposes].map((c) => (
								<SelectItem key={c === "all" ? "all" : c?.toLowerCase()}>
									{c === "all" ? "All purposes" : c}
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
