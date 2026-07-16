"use client";

import { tableCls } from "../shared/styleConstants";
import { SponsorGroupTableData, SponsorTableData } from "./types";
import {
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
	Link,
} from "@heroui/react";

interface SponsorsTableProps {
	data: (SponsorGroupTableData | SponsorTableData)[];
	isGroupsTab: boolean;
	onEdit: (id: string) => void;
}

export function SponsorsTable({
	data,
	isGroupsTab,
	onEdit,
}: SponsorsTableProps) {
	return (
		<div className="w-full">
			<Table
				aria-label="Sponsor table"
				classNames={tableCls}
			>
				<TableHeader>
					{isGroupsTab ? (
						<>
							<TableColumn key="group_name">GROUP NAME</TableColumn>
							<TableColumn key="sponsor_type">TYPE</TableColumn>
						</>
					) : (
						<>
							<TableColumn key="last_name">LAST NAME</TableColumn>
							<TableColumn key="first_name">FIRST NAME</TableColumn>
						</>
					)}
					<TableColumn key="id">ID</TableColumn>
					<TableColumn key="location">LOCATION</TableColumn>
					<TableColumn key="status">STATUS</TableColumn>
					<TableColumn key="children">CHILDREN</TableColumn>
					<TableColumn key="actions">ACTIONS</TableColumn>
				</TableHeader>
				<TableBody
					emptyContent={`No ${isGroupsTab ? "groups" : "sponsors"} found`}
					items={data}
				>
					{(item) =>
						isGroupsTab
							? (() => {
									const group = item as SponsorGroupTableData;
									return (
										<TableRow key={group.id}>
											<TableCell className="text-slate-800">
												{group.group_name}
											</TableCell>
											<TableCell className="text-slate-800">
												{group.sponsor_type}
											</TableCell>
											<TableCell className="text-slate-600">
												{group.id}
											</TableCell>
											<TableCell className="text-slate-600">
												{group.country}
											</TableCell>
											<TableCell
												className={
													group.status === "Active"
														? "text-success"
														: "text-warning"
												}
											>
												{group.status}
											</TableCell>
											<TableCell className="text-slate-600">
												{group.children_count}
											</TableCell>
											<TableCell>
												<div className="flex items-center whitespace-nowrap">
													<Link
														href={`/admin/sponsors/${group.id}`}
														className="cursor-pointer text-primary hover:underline"
													>
														View
													</Link>
													<span className="mx-1 text-slate-300">|</span>
													<Link
														onPress={() => onEdit(group.id)}
														className="cursor-pointer text-primary hover:underline"
													>
														Edit
													</Link>
												</div>
											</TableCell>
										</TableRow>
									);
								})()
							: (() => {
									const sponsor = item as SponsorTableData;
									return (
										<TableRow key={sponsor.id}>
											<TableCell className="text-slate-800">
												{sponsor.last_name}
											</TableCell>
											<TableCell className="text-slate-800">
												{sponsor.first_name}
											</TableCell>
											<TableCell className="text-slate-600">
												{sponsor.id}
											</TableCell>
											<TableCell className="text-slate-600">
												{sponsor.country}
											</TableCell>
											<TableCell
												className={
													sponsor.status === "Active"
														? "text-success"
														: "text-warning"
												}
											>
												{sponsor.status}
											</TableCell>
											<TableCell className="text-slate-600">
												{sponsor.children_count}
											</TableCell>
											<TableCell>
												<div className="flex items-center whitespace-nowrap">
													<Link
														href={`/admin/sponsors/${sponsor.id}`}
														className="cursor-pointer text-primary hover:underline"
													>
														View
													</Link>
													<span className="mx-1 text-slate-300">|</span>
													<Link
														onPress={() => onEdit(sponsor.id)}
														className="cursor-pointer text-primary hover:underline"
													>
														Edit
													</Link>
												</div>
											</TableCell>
										</TableRow>
									);
								})()
					}
				</TableBody>
			</Table>
		</div>
	);
}
