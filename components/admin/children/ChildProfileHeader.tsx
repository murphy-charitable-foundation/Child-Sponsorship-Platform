import Link from "next/link";
import { StatusType } from "./types";

type ChildProfileHeaderProps = {
	child: {
		id: string;
		full_name: string;
		enrolled: string;
		age: number;
		status: StatusType;
	};
};

export function ChildProfileHeader({ child }: ChildProfileHeaderProps) {
	return (
		<div>
			<div>
				<Link
					href={"/admin/children"}
					className="text-sm font-semibold text-primary"
				>
					Children{" "}
				</Link>
				<span className="text-sm ">/ {child.full_name}</span>
			</div>
			<h2 className="text-3xl font-semibold pt-5">{child.full_name}</h2>
			<div className="text-sm text-slate-600 flex gap-2 pt-1">
				<p>{child.id}</p>
				<span>•</span>
				<p>{child.age} years old</p>
				<span>•</span>
				<p>enrolled {child.enrolled.split("T")[0]}</p>
				<span>•</span>
				<p className="text-green-600 uppercase">{child.status}</p>
			</div>
		</div>
	);
}
