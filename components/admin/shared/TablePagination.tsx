import { pageCapacities } from "@/lib/constants";
import { Pagination, Select, SelectItem } from "@heroui/react";
import React, { Dispatch, SetStateAction } from "react";

type Props = {
	page: number;
	onSetPage: Dispatch<SetStateAction<number>>;
	totalPage: number;
	selectedPageCapacity: number;
	onSetPageCapacity: Dispatch<SetStateAction<number>>;
};

export default function TablePagination({
	page,
	onSetPage,
	totalPage,
	selectedPageCapacity,
	onSetPageCapacity,
}: Props) {
	return (
		<div className="flex items-center mt-4 justify-center">
			<Pagination
				showControls
				onChange={onSetPage}
				page={page}
				initialPage={1}
				total={totalPage}
				className=" flex justify-center"
				color="primary"
				variant="bordered"
			/>
			<span className="text-sm text-default-500 whitespace-nowrap mx-4">
				Items per page:
			</span>
			<Select
				aria-label="Items per page"
				variant="bordered"
				fullWidth={false}
				defaultSelectedKeys={["10"]}
				selectedKeys={new Set([String(selectedPageCapacity)])}
				onSelectionChange={(keys) => {
					const [selected] = Array.from(keys as Set<string>);

					if (selected) {
						onSetPageCapacity(Number(selected));
						onSetPage(1);
					}
				}}
			>
				{pageCapacities.map((capacity) => (
					<SelectItem key={capacity.toString()}>
						{capacity.toString()}
					</SelectItem>
				))}
			</Select>
		</div>
	);
}
