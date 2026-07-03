import Image from "next/image";

import { Avatar } from "@heroui/react";

type ChildTabHeaderProps = {
	child: {
		id: string;
		full_name: string;
		image_url?: string | null;
	};
	subtitle: string;
	actionLabel?: string;
	onActionClick?: () => void;
};

export function ChildTabHeader({
	child,
	subtitle,
	actionLabel,
	onActionClick,
}: ChildTabHeaderProps) {
	return (
		<div className="mb-6 flex items-center justify-between">
			<div className="flex items-center gap-4">
				{child.image_url ? (
					<Image
						src={child.image_url}
						alt={child.full_name}
						fill
						className="object-cover object-[center_30%]  w-full rounded-xl "
						width={64}
						height={64}
						unoptimized
					/>
				) : (
					<Avatar
						radius="none"
						color="primary"
						className="object-cover object-[center_30%] h-[64px] w-[64px] rounded-xl "
					/>
				)}
				<div>
					<p className="text-xl font-semibold text-slate-800">
						{child.full_name}
					</p>
					<p className="text-sm text-slate-500">{subtitle}</p>
				</div>
			</div>
			{actionLabel && (
				<button
					onClick={onActionClick}
					className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
				>
					{actionLabel}
				</button>
			)}
		</div>
	);
}
