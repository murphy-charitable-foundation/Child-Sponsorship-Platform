"use client";
import { useRouter } from "next/navigation";
import {
	Link,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
} from "@heroui/react";
import { tableCls } from "../shared/styleConstants";
import { User } from "./type";
// import EditUserDrawer from "./EditUserDrawer";
// import { useState } from "react";

type Props = {
	data: User[];
};

export default function UsersTable({ data }: Props) {
	const router = useRouter();
	// const [isEdit, setIsEdit] = useState<boolean>(false);
	// const [editUser, setEditUser] = useState<User | null>(null);

	// function handleEdit(u: User) {
	// 	setEditUser(u);
	// 	setIsEdit(true);
	// }

	return (
		<div className="w-full">
			<Table
				aria-label="Users table"
				onRowAction={(key) => router.push(`/admin/users/${key}`)}
				classNames={tableCls}
			>
				<TableHeader>
					<TableColumn>LAST NAME</TableColumn>
					<TableColumn>FIRST NAME</TableColumn>
					<TableColumn>ORGANIZATION</TableColumn>
					<TableColumn>ROLE</TableColumn>
					<TableColumn>STATUS</TableColumn>
					<TableColumn>LAST ACTIVE</TableColumn>
					<TableColumn>ACTIONS</TableColumn>
				</TableHeader>

				<TableBody
					emptyContent={"No children found"}
					items={data}
				>
					{(u) => (
						<TableRow key={u.id}>
							<TableCell className="text-slate-800">{u.last_name}</TableCell>
							<TableCell className="text-slate-800">{u.first_name}</TableCell>
							<TableCell className="text-slate-600">{u.organization}</TableCell>
							<TableCell className="text-slate-600">{u.role}</TableCell>
							<TableCell
								className={
									u.status === "Active"
										? "text-success"
										: u.status === "Pending"
											? "text-warning"
											: "text-default"
								}
							>
								{u.status}
							</TableCell>
							<TableCell className="text-slate-600">
								{u.last_active ? u.last_active.split("T")[0] : "-"}
							</TableCell>
							<TableCell>
								<div className="flex items-center whitespace-nowrap">
									<Link
										href={`/admin/user/${u.id}`}
										className="cursor-pointer text-primary hover:underline"
									>
										View
									</Link>
									<span className="mx-1 text-slate-300">|</span>
									<Link
										// onPress={() => handleEdit(u)}
										className="cursor-pointer text-primary hover:underline"
									>
										Edit
									</Link>
								</div>
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>

			{/* <EditUserDrawer
				user={editUser}
				isOpen={isEdit}
				onClose={() => setIsEdit(false)}
			/> */}
		</div>
	);
}
