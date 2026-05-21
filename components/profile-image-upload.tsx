"use client";

import { useRef, useState, useEffect } from "react";
import { Camera } from "lucide-react";

type Props = {
	currentUrl?: string;
	name?: string;
	onChange: (file: File) => void;
	size?: number;
};

async function compressToJpeg(
	file: File,
	maxDim = 400,
	quality = 0.82,
): Promise<File> {
	return new Promise((resolve, reject) => {
		const img = new Image();
		const objectUrl = URL.createObjectURL(file);

		img.onload = () => {
			URL.revokeObjectURL(objectUrl);

			let { width, height } = img;
			if (width > height && width > maxDim) {
				height = Math.round((height * maxDim) / width);
				width = maxDim;
			} else if (height >= width && height > maxDim) {
				width = Math.round((width * maxDim) / height);
				height = maxDim;
			}

			const canvas = document.createElement("canvas");
			canvas.width = width;
			canvas.height = height;
			canvas.getContext("2d")!.drawImage(img, 0, 0, width, height);

			canvas.toBlob(
				(blob) => {
					if (!blob) return reject(new Error("Compression failed"));
					const name = file.name.replace(/\.[^.]+$/, ".jpg");
					resolve(new File([blob], name, { type: "image/jpeg" }));
				},
				"image/jpeg",
				quality,
			);
		};

		img.onerror = reject;
		img.src = objectUrl;
	});
}

export default function ProfileImageUpload({
	currentUrl,
	name,
	onChange,
	size = 96,
}: Props) {
	const inputRef = useRef<HTMLInputElement>(null);
	const [preview, setPreview] = useState<string | null>(null);
	const [compressing, setCompressing] = useState(false);

	useEffect(() => {
		return () => {
			if (preview) URL.revokeObjectURL(preview);
		};
	}, [preview]);

	async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
		const raw = e.target.files?.[0];
		if (!raw) return;
		e.target.value = "";

		setCompressing(true);
		try {
			const compressed = await compressToJpeg(raw);
			if (preview) URL.revokeObjectURL(preview);
			setPreview(URL.createObjectURL(compressed));
			onChange(compressed);
		} finally {
			setCompressing(false);
		}
	}

	const initials = name
		? name
				.split(" ")
				.map((w) => w[0])
				.join("")
				.toUpperCase()
				.slice(0, 2)
		: "?";

	const displaySrc = preview ?? currentUrl;

	return (
		<div className="flex flex-col items-center gap-1">
			<div
				className="relative cursor-pointer group"
				style={{ width: size, height: size }}
				onClick={() => !compressing && inputRef.current?.click()}
			>
				<div className="w-full h-full rounded-full overflow-hidden bg-gray-100 border-2 border-gray-200 flex items-center justify-center">
					{displaySrc ? (
						<img
							src={displaySrc}
							alt="Profile"
							className="w-full h-full object-cover"
						/>
					) : (
						<span className="text-gray-500 font-semibold text-2xl select-none">
							{initials}
						</span>
					)}
				</div>

				<div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
					{compressing ? (
						<div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
					) : (
						<Camera
							size={20}
							className="text-white"
						/>
					)}
				</div>
			</div>

			<span className="text-xs text-gray-400">Click to change photo</span>

			<input
				ref={inputRef}
				type="file"
				accept="image/jpeg,image/png,image/webp"
				className="hidden"
				onChange={handleFile}
			/>
		</div>
	);
}
