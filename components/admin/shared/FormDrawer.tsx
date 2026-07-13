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
	onSubmit: (e: React.FormEvent) => void;
	isSaving: boolean;
	error?: string | null;
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
	saveLabel,
	saveDisabled,
	bodyClassName = "py-5",
	children,
}: FormDrawerProps) {
	return (
		<Drawer
			isOpen={isOpen}
			onOpenChange={onClose}
			size="lg"
			placement="right"
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
									<div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
										{error}
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

export const inputCls =
	"w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200";

export const textareaCls =
	"w-full resize-vertical rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200";

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
