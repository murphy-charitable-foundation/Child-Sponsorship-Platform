import Link from "next/link";
import { ChildStatus } from "../children/types";
import { SponsorStatus } from "../sponsors/types";

type ProfileHeaderProps = {
	href: string;
	type: "child" | "sponsor";
	data: {
		id: string;
		full_name: string;
		enrolled: string;
		age?: number;
		status: ChildStatus | SponsorStatus;
	};
};

export function ProfileHeader({ data, type, href }: ProfileHeaderProps) {
	return (
		<div>
			<div>
				<Link
					href={href}
					className="text-sm font-semibold text-primary"
				>
					{type === "child" ? "Children" : "Sponsors"}{" "}
				</Link>
				<span className="text-sm ">/ {data.full_name}</span>
			</div>
			<h2 className="text-3xl font-semibold pt-5">{data.full_name}</h2>
			<div className="text-sm text-slate-600 flex gap-2 pt-1">
				<p>{data.id}</p>
				<span>•</span>
				{type === "child" && (
					<>
						<p>{data.age} years old</p>
						<span>•</span>
					</>
				)}
				<p>enrolled {data.enrolled.split("T")[0]}</p>
				<span>•</span>
				<p className="text-green-600 uppercase">{data.status}</p>
			</div>
		</div>
	);
}
