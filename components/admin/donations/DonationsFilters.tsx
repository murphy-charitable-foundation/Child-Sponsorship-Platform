import { Input, Select, SelectItem } from "@heroui/react";
import { filterInputCls, filterSelectCls } from "../shared/styleConstants";

type DonationsFilterProps = {
	selectedCountry: Set<string>;
	setSelectedCountry: (country: Set<string>) => void;
	searchQuery: string;
	setSearchQuery: (query: string) => void;
};

export default function DonationsFilters({
	selectedCountry,
	setSelectedCountry,
	searchQuery,
	setSearchQuery,
}: DonationsFilterProps) {
	const handleReset = () => {
		setSelectedCountry(new Set(["all"]));
		setSearchQuery("");
	};

	return (
		<div className="bg-gray-100 p-6">
			<div className="space-y-3">
				<div className="flex gap-4">
					<div className="flex-1">
						<label className="text-xs font-semibold text-gray-600 tracking-wider">
							Search
						</label>
					</div>
					<div className="w-1/5">
						<label className="text-xs font-semibold text-gray-600 tracking-wider">
							Country
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

					<div className="w-1/5">
						<Select
							aria-label="Country"
							selectedKeys={selectedCountry}
							onSelectionChange={(keys) => {
								const newKeys = new Set(Array.from(keys as Set<string>));

								// If "all" is selected, keep only "all"
								if (newKeys.has("all")) {
									setSelectedCountry(new Set(["all"]));
								}
								// If an individual country is clicked when "all" was selected, switch to just that country
								else if (newKeys.size > 0) {
									setSelectedCountry(newKeys);
								}
								// Allow empty selection
								else {
									setSelectedCountry(new Set());
								}
							}}
							className="w-full"
							radius="none"
							classNames={filterSelectCls}
							renderValue={(items) => (
								<span className="flex gap-2">
									{items.length === 0 ? (
										<span className="text-default-500">
											No country selected
										</span>
									) : items.some((item) => item.key === "all") ? (
										<span className="text-default-700">All countries</span>
									) : (
										items.map((item) => (
											<span key={item.key}>{item.textValue}</span>
										))
									)}
								</span>
							)}
						>
							<SelectItem key="all">All countries</SelectItem>
							<SelectItem key="usa">USA</SelectItem>
							<SelectItem key="uk">UK</SelectItem>
							<SelectItem key="canada">Canada</SelectItem>
							<SelectItem key="australia">Australia</SelectItem>
							<SelectItem key="spain">Spain</SelectItem>
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
