import ProfileImageUpload from "@/components/profile-image-upload";
import { CreateSponsor, SponsorType } from "./types";
import { SP_COUNTRIES } from "./AddIndividualForm";
import { Field, inputCls } from "../shared/FormDrawer";

type AddGroupFormProps = {
	form: CreateSponsor;
	update: <K extends keyof CreateSponsor>(
		key: K,
		value: CreateSponsor[K],
	) => void;
};

export const GROUP_TYPES: { key: SponsorType; label: string }[] = [
	{ key: "family", label: "Family" },
	{ key: "company", label: "Company / Business" },
	{ key: "ngo", label: "Organization / NGO" },
	{ key: "religious", label: "Religious Institution" },
];

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
							<select
								className={inputCls}
								value={form?.sponsor_type ?? ""}
								onChange={(e) =>
									update("sponsor_type", e.target.value as SponsorType)
								}
							>
								<option value="">Select group description</option>
								{GROUP_TYPES.map((t) => (
									<option
										key={t.key}
										value={t.key}
									>
										{t.label}
									</option>
								))}
							</select>
						</Field>
						<Field label="Group name">
							<input
								className={inputCls}
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
						<input
							className={inputCls}
							value={form.address_line1 ?? ""}
							onChange={(e) => update("address_line1", e.target.value)}
						/>
					</Field>
					<Field label="Address line 2">
						<input
							className={inputCls}
							value={form.address_line2 ?? ""}
							onChange={(e) => update("address_line2", e.target.value)}
						/>
					</Field>
					<div className="grid grid-cols-2 gap-3">
						<Field label="City">
							<input
								className={inputCls}
								value={form.city ?? ""}
								onChange={(e) => update("city", e.target.value)}
							/>
						</Field>
						<Field label="State/Province">
							<input
								className={inputCls}
								value={form.state ?? ""}
								onChange={(e) => update("state", e.target.value)}
							/>
						</Field>
					</div>
					<div className="grid grid-cols-2 gap-3">
						<Field label="Zip/postal code">
							<input
								className={inputCls}
								value={form.zip ?? ""}
								onChange={(e) => update("zip", e.target.value)}
							/>
						</Field>
						<Field label="Country">
							<select
								className={inputCls}
								value={form.country ?? ""}
								onChange={(e) => update("country", e.target.value)}
							>
								<option value="">Select country</option>
								{SP_COUNTRIES.map((c) => (
									<option key={c}>{c}</option>
								))}
							</select>
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
							<input
								className={inputCls}
								value={form.first_name ?? ""}
								onChange={(e) => update("first_name", e.target.value)}
							/>
						</Field>
						<Field label="Last name">
							<input
								className={inputCls}
								value={form.last_name ?? ""}
								onChange={(e) => update("last_name", e.target.value)}
							/>
						</Field>
					</div>
					<Field label="Job title">
						<input
							className={inputCls}
							value={form.job_title ?? ""}
							onChange={(e) => update("job_title", e.target.value)}
						/>
					</Field>
					<div className="grid grid-cols-2 gap-3">
						<Field label="Phone number">
							<input
								type="tel"
								className={inputCls}
								value={form.phone_number ?? ""}
								onChange={(e) => update("phone_number", e.target.value)}
							/>
						</Field>
						<Field label="Email">
							<input
								type="email"
								className={inputCls}
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
