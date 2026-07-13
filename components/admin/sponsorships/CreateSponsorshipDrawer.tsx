"use client";

import { useState } from "react";
import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerBody,
	DrawerFooter,
	Button,
} from "@heroui/react";

const FREQUENCIES = ["Monthly", "One-time", "Annual"];

type CreateSponsorshipDrawerProps = {
	isOpen: boolean;
	onClose: () => void;
};

export default function CreateSponsorshipDrawer({
	isOpen,
	onClose,
}: CreateSponsorshipDrawerProps) {
	const [sponsorName, setSponsorName] = useState("");
	const [childName, setChildName] = useState("");
	const [amount, setAmount] = useState("");
	const [frequency, setFrequency] = useState("Monthly");
	const [startDate, setStartDate] = useState("");

	function handleClose() {
		setSponsorName("");
		setChildName("");
		setAmount("");
		setFrequency("Monthly");
		setStartDate("");
		onClose();
	}

	return (
		<Drawer
			isOpen={isOpen}
			onOpenChange={handleClose}
			size="lg"
			placement="right"
		>
			<DrawerContent>
				{(closeDrawer) => (
					<>
						<DrawerHeader className="border-b border-slate-200 text-lg font-semibold text-slate-900">
							Create Sponsorship
						</DrawerHeader>

						<DrawerBody className="space-y-4 py-6">
							<Field label="Sponsor name">
								<input
									className={cls}
									value={sponsorName}
									onChange={(e) => setSponsorName(e.target.value)}
									placeholder="Search sponsor..."
								/>
							</Field>
							<Field label="Child name">
								<input
									className={cls}
									value={childName}
									onChange={(e) => setChildName(e.target.value)}
									placeholder="Search child..."
								/>
							</Field>
							<div className="grid grid-cols-2 gap-4">
								<Field label="Amount ($)">
									<input
										type="number"
										className={cls}
										value={amount}
										onChange={(e) => setAmount(e.target.value)}
										placeholder="0"
									/>
								</Field>
								<Field label="Frequency">
									<select
										className={cls}
										value={frequency}
										onChange={(e) => setFrequency(e.target.value)}
									>
										{FREQUENCIES.map((f) => (
											<option key={f}>{f}</option>
										))}
									</select>
								</Field>
							</div>
							<Field label="Start date">
								<input
									type="date"
									className={cls}
									value={startDate}
									onChange={(e) => setStartDate(e.target.value)}
								/>
							</Field>
						</DrawerBody>

						<DrawerFooter className="border-t border-slate-200">
							<Button
								variant="light"
								onPress={closeDrawer}
								className="text-slate-700"
							>
								Cancel
							</Button>
							<Button
								className="bg-primary text-white"
								onPress={closeDrawer}
							>
								Create Sponsorship
							</Button>
						</DrawerFooter>
					</>
				)}
			</DrawerContent>
		</Drawer>
	);
}

function Field({
	label,
	children,
}: {
	label: string;
	children: React.ReactNode;
}) {
	return (
		<label className="block">
			<span className="mb-1 block text-xs text-slate-500">{label}</span>
			{children}
		</label>
	);
}

const cls =
	"w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20";
