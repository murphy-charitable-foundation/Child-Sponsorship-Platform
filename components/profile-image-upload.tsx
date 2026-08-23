"use client";

import Compressor from "compressorjs";
import NextImage from "next/image";
import { useRef, useState, useEffect, useCallback } from "react";
import { Camera } from "lucide-react";
import Cropper from "react-easy-crop";
import type { Area, Point } from "react-easy-crop";
import { Button } from "@heroui/react";
import { Camera as CameraIcon } from "lucide-react";

type Props = {
	currentUrl?: string;
	name?: string;
	onChange: (file: File) => void;
	size?: number;
};

const MAX_BYTES = 45 * 1024;

async function compressOnce(
	file: File,
	maxDim: number,
	quality: number,
): Promise<File> {
	return new Promise((resolve, reject) => {
		new Compressor(file, {
			maxWidth: maxDim,
			maxHeight: maxDim,
			convertSize: 0,
			convertTypes: ["image/png", "image/webp"],
			mimeType: "image/jpeg",
			quality,
			success(result) {
				const name = file.name.replace(/\.[^.]+$/, ".jpg");
				resolve(new File([result], name, { type: "image/jpeg" }));
			},
			error: reject,
		});
	});
}

//Try compress until the size become less that MaxBites (45kb)
async function compressToJpeg(file: File): Promise<File> {
	const attempts: Array<{ maxDim: number; quality: number }> = [
		{ maxDim: 500, quality: 0.7 },
		{ maxDim: 400, quality: 0.6 },
		{ maxDim: 350, quality: 0.5 },
		{ maxDim: 300, quality: 0.4 },
		{ maxDim: 250, quality: 0.3 },
	];

	let last: File | null = null;
	for (const { maxDim, quality } of attempts) {
		last = await compressOnce(file, maxDim, quality);
		if (last.size <= MAX_BYTES) return last;
	}
	return last!;
}

async function cropImageToFile(
	imageSrc: string,
	pixelCrop: Area,
	fileName: string,
): Promise<File> {
	const image = await new Promise<HTMLImageElement>((resolve, reject) => {
		const img = new Image();
		img.addEventListener("load", () => resolve(img));
		img.addEventListener("error", reject);
		img.src = imageSrc;
	});

	const canvas = document.createElement("canvas");
	canvas.width = pixelCrop.width;
	canvas.height = pixelCrop.height;
	const ctx = canvas.getContext("2d")!;
	ctx.drawImage(
		image,
		pixelCrop.x,
		pixelCrop.y,
		pixelCrop.width,
		pixelCrop.height,
		0,
		0,
		pixelCrop.width,
		pixelCrop.height,
	);

	return new Promise((resolve, reject) => {
		canvas.toBlob((blob) => {
			if (!blob) return reject(new Error("Canvas is empty"));
			resolve(new File([blob], fileName, { type: "image/jpeg" }));
		}, "image/jpeg");
	});
}

export default function ProfileImageUpload({
	currentUrl,
	onChange,
	size = 200,
}: Props) {
	const inputRef = useRef<HTMLInputElement>(null);
	const [preview, setPreview] = useState<string | null>(null);
	const [compressing, setCompressing] = useState(false);
	const [error, setError] = useState<string | null>(null);

	// Crop state
	const [cropSrc, setCropSrc] = useState<string | null>(null);
	const [cropFileName, setCropFileName] = useState("photo.jpg");
	const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
	const [zoom, setZoom] = useState<number>(1);
	const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

	useEffect(() => {
		return () => {
			if (preview) URL.revokeObjectURL(preview);
			if (cropSrc) URL.revokeObjectURL(cropSrc);
		};
	}, [preview, cropSrc]);

	async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
		const raw = e.target.files?.[0];
		if (!raw) return;
		e.target.value = "";
		setError(null);
		setCropFileName(raw.name.replace(/\.[^.]+$/, ".jpg"));
		setCrop({ x: 0, y: 0 });
		setZoom(1);
		setCropSrc(URL.createObjectURL(raw));
	}

	const onCropComplete = useCallback((_: Area, pixels: Area) => {
		setCroppedAreaPixels(pixels);
	}, []);

	async function handleConfirmCrop() {
		if (!cropSrc || !croppedAreaPixels) return;
		setCompressing(true);
		setError(null);
		try {
			const cropped = await cropImageToFile(
				cropSrc,
				croppedAreaPixels,
				cropFileName,
			);
			const compressed = await compressToJpeg(cropped);
			if (compressed.size > MAX_BYTES) {
				setError(
					"Image is too large even after compression. Please use a simpler or smaller image.",
				);
				return;
			}
			if (preview) URL.revokeObjectURL(preview);
			setPreview(URL.createObjectURL(compressed));
			onChange(compressed);
			setCropSrc(null);
		} finally {
			setCompressing(false);
		}
	}

	const displaySrc = preview ?? currentUrl;

	return (
		<div className="flex flex-col items-center gap-1">
			{/* Crop overlay */}
			{cropSrc && (
				<div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/70">
					<div className="relative w-96 h-72">
						<Cropper
							image={cropSrc}
							crop={crop}
							zoom={zoom}
							aspect={4 / 3}
							cropShape="rect"
							showGrid={false}
							onCropChange={setCrop}
							onZoomChange={setZoom}
							onCropComplete={onCropComplete}
						/>
					</div>
					<input
						type="range"
						aria-label="Zoom"
						min={1}
						max={3}
						step={0.01}
						value={zoom}
						onChange={(e) => setZoom(Number(e.target.value))}
						className="mt-4 w-64 accent-white"
					/>
					<div className="mt-4 flex gap-3">
						<Button
							variant="flat"
							onPress={() => setCropSrc(null)}
							isDisabled={compressing}
						>
							Cancel
						</Button>
						<Button
							color="primary"
							onPress={handleConfirmCrop}
							isLoading={compressing}
						>
							Crop & Save
						</Button>
					</div>
				</div>
			)}

			{/* Avatar */}
			<div
				className="relative cursor-pointer group"
				style={{ width: size, height: size }}
				onClick={() => !compressing && inputRef.current?.click()}
			>
				<div className="relative w-full h-full flex items-center justify-center overflow-hidden border-2 border-dashed border-slate-300 text-center">
					{displaySrc ? (
						<NextImage
							src={displaySrc}
							alt="Profile"
							fill
							unoptimized
							className="object-cover"
							loading="eager"
						/>
					) : (
						<div className="flex flex-col items-center justify-center p-8">
							<CameraIcon size={24} />
							<p className="mt-3 text-xs text-gray-400">Click to add photo</p>
						</div>
					)}
				</div>

				<div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
					{compressing ? (
						<div className=" border-2 border-white border-t-transparent  animate-spin" />
					) : (
						<Camera
							size={20}
							className="text-white"
						/>
					)}
				</div>
			</div>

			{error && (
				<span className="text-xs text-red-500 text-center max-w-[160px]">
					{error}
				</span>
			)}

			<input
				ref={inputRef}
				type="file"
				aria-label="Upload profile photo"
				accept="image/jpeg,image/png,image/webp"
				className="hidden"
				onChange={handleFile}
			/>
		</div>
	);
}
