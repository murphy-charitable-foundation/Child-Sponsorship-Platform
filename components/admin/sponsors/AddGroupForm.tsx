import ProfileImageUpload from "@/components/profile-image-upload";
import { CreateSponsor, SponsorType } from "./types";
import { Field } from "../shared/FormDrawer";
import { SP_COUNTRIES, SPONSOR_GROUP_TYPES } from "@/lib/constants";
import { Input, Select, SelectItem } from "@heroui/react";
import { filterInputCls, filterSelectCls } from "../shared/styleConstants";

type AddGroupFormProps = {
	form: CreateSponsor;
	update: <K extends keyof CreateSponsor>(
		key: K,
		value: CreateSponsor[K],
	) => void;
};

export default function AddGroupForm({ form, update }: AddGroupFormProps) {
	return (
		<div className="mt-4 space-y-6">
			<section>
				{/* Photo Upload */}
				<div className="mt-6 mb-6">
					<ProfileImageUpload
						name={`${form.first_name} ${form.last_name}`.trim()}
						onChange={(file) => update("photo_file", file)}
						size={200}
					/>
				</div>

				<section>
					<h3 className="mb-4 text-base font-semibold text-slate-900">
						Group Details
					</h3>
					<div className="space-y-3">
						<Field label="Group type">
							<Select
								classNames={filterSelectCls}
								value={form?.sponsor_type ?? ""}
								onChange={(e) =>
									update("sponsor_type", e.target.value as SponsorType)
								}
							>
								{SPONSOR_GROUP_TYPES.map((t) => (
									<SelectItem key={t.key}>{t.label}</SelectItem>
								))}
							</Select>
						</Field>
						<Field label="Group name">
							<Input
								classNames={filterInputCls}
								value={form?.group_name ?? ""}
								onChange={(e) => update("group_name", e.target.value)}
							/>
						</Field>
					</div>
				</section>

				<h3 className="mt-6 mb-4 text-base font-semibold text-slate-900">
					Name and Address
				</h3>
				<div className="space-y-3">
					<Field label="Address line 1">
						<Input
							classNames={filterInputCls}
							value={form.address_line1 ?? ""}
							onChange={(e) => update("address_line1", e.target.value)}
						/>
					</Field>
					<Field label="Address line 2">
						<Input
							classNames={filterInputCls}
							value={form.address_line2 ?? ""}
							onChange={(e) => update("address_line2", e.target.value)}
						/>
					</Field>
					<div className="grid grid-cols-2 gap-3">
						<Field label="City">
							<Input
								classNames={filterInputCls}
								value={form.city ?? ""}
								onChange={(e) => update("city", e.target.value)}
							/>
						</Field>
						<Field label="State/Province">
							<Input
								classNames={filterInputCls}
								value={form.state ?? ""}
								onChange={(e) => update("state", e.target.value)}
							/>
						</Field>
					</div>
					<div className="grid grid-cols-2 gap-3">
						<Field label="Zip/postal code">
							<Input
								classNames={filterInputCls}
								value={form.zip ?? ""}
								onChange={(e) => update("zip", e.target.value)}
							/>
						</Field>
						<Field label="Country">
							<Select
								classNames={filterInputCls}
								value={form.country ?? ""}
								onChange={(e) => update("country", e.target.value)}
							>
								{SP_COUNTRIES.map((c) => (
									<SelectItem key={c}>{c}</SelectItem>
								))}
							</Select>
						</Field>
					</div>
				</div>
			</section>

			<section>
				<h3 className="mb-4 text-base font-semibold text-slate-900">
					Primary Contact
				</h3>
				<div className="space-y-3">
					<div className="grid grid-cols-2 gap-3">
						<Field label="First name">
							<Input
								classNames={filterInputCls}
								value={form.first_name ?? ""}
								onChange={(e) => update("first_name", e.target.value)}
							/>
						</Field>
						<Field label="Last name">
							<Input
								classNames={filterInputCls}
								value={form.last_name ?? ""}
								onChange={(e) => update("last_name", e.target.value)}
							/>
						</Field>
					</div>
					<Field label="Job title">
						<Input
							classNames={filterInputCls}
							value={form.job_title ?? ""}
							onChange={(e) => update("job_title", e.target.value)}
						/>
					</Field>
					<div className="grid grid-cols-2 gap-3">
						<Field label="Phone number">
							<Input
								type="tel"
								classNames={filterInputCls}
								value={form.phone_number ?? ""}
								onChange={(e) => update("phone_number", e.target.value)}
							/>
						</Field>
						<Field label="Email">
							<Input
								type="email"
								classNames={filterInputCls}
								value={form.email ?? ""}
								onChange={(e) => update("email", e.target.value)}
							/>
						</Field>
					</div>
				</div>
			</section>
		</div>
	);
}
