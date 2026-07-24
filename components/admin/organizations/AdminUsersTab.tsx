import { useEffect, useState } from "react";
import AddUserDrawer from "./AddUserDrawer";
import UsersFilters from "./UsersFilters";
import UsersTable from "./UsersTable";
import { User } from "./type";

export default function AdminUsersTab() {
	const [search, setSearch] = useState("");
	const [organization, setOrganization] = useState("all");
	const [status, setStatus] = useState("all");
	const [isAddOpen, setIsAddOpen] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [users, setUsers] = useState<User[]>([]);

	useEffect(() => {
		async function fetchAdminUsers() {
			try {
				const res = await fetch("/api/supabase/users");

				if (!res.ok) {
					console.error("Error fetching admin users", await res.text());
					return;
				}

				const { data } = await res.json();

				setUsers(data);
			} catch (err) {
				setError("Failed to get admin users data");
				console.error("Failed to fetch children awaiting sponsorship:", err);
			}
		}

		fetchAdminUsers();
	}, []);

	const filtered = users.filter((user) => {
		const q = search.toLowerCase();
		const matchSearch =
			!q ||
			user.first_name.toLowerCase().includes(q) ||
			user.last_name.toLowerCase().includes(q);
		const matchOrg =
			organization === "all" ||
			user.organization?.toLowerCase() === organization.toLowerCase();
		const matchStatus =
			status === "all" || user.status.toLowerCase() === status.toLowerCase();
		return matchSearch && matchOrg && matchStatus;
	});

	return (
		<div>
			<div className="flex items-center justify-between">
				<h2 className="text-2xl font-semibold text-slate-800">Users</h2>
				<button
					onClick={() => setIsAddOpen(true)}
					className="bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary/90"
				>
					Create user
				</button>
			</div>

			{/* Filters */}
			<div className="mt-10">
				<UsersFilters
					status={status}
					setStatus={setStatus}
					organization={organization}
					setOrganization={setOrganization}
					search={search}
					setSearch={setSearch}
				/>

				{/* Table */}
				{error && (
					<div className="my-4 rounded-md bg-danger-50 px-4 py-3 text-sm text-danger">
						{error}
					</div>
				)}

				{/* Users Table */}
				<UsersTable data={filtered} />
			</div>

			<AddUserDrawer
				isOpen={isAddOpen}
				onClose={() => setIsAddOpen(false)}
			/>
		</div>
	);
}
