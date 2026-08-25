"use client";

import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerBody,
	DrawerFooter,
	Button,
} from "@heroui/react";

type FormDrawerProps = {
	isOpen: boolean;
	onClose: () => void;
	title: string;
	formId: string;
	onSubmit?: (e: React.FormEvent) => void;
	isSaving?: boolean;
	error?: string | null;
	success?: string | null;
	saveLabel: string;
	saveDisabled?: boolean;
	bodyClassName?: string;
	children: React.ReactNode;
};

export default function FormDrawer({
	isOpen,
	onClose,
	title,
	formId,
	onSubmit,
	isSaving,
	error,
	success,
	saveLabel,
	saveDisabled,
	bodyClassName = "py-5",
	children,
}: FormDrawerProps) {
	return (
		<Drawer
			isOpen={isOpen}
			onOpenChange={onClose}
			placement="right"
			classNames={{ base: "w-[600px] max-w-[600px]" }}
		>
			<DrawerContent>
				{(closeDrawer) => (
					<>
						<DrawerHeader className="border-b border-slate-200 text-2xl font-semibold text-primary">
							{title}
						</DrawerHeader>

						<DrawerBody className={bodyClassName}>
							<form
								id={formId}
								className="space-y-6"
								onSubmit={onSubmit}
							>
								{error && (
									<div className="rounded-sm bg-red-50 px-3 py-2 text-sm text-red-600">
										{error}
									</div>
								)}
								{success && (
									<div className="rounded-sm bg-green-50 px-3 py-2 text-sm text-green-600">
										{success}
									</div>
								)}
								{children}
							</form>
						</DrawerBody>

						<DrawerFooter className="border-t border-slate-200">
							<Button
								variant="light"
								onPress={closeDrawer}
								className="text-slate-700"
								isDisabled={isSaving}
							>
								Cancel
							</Button>
							<Button
								type="submit"
								form={formId}
								className="bg-primary text-white"
								isLoading={isSaving}
								isDisabled={saveDisabled}
							>
								{saveLabel}
							</Button>
						</DrawerFooter>
					</>
				)}
			</DrawerContent>
		</Drawer>
	);
}
export function Field({
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
