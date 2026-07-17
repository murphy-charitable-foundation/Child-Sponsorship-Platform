"use client";

import {
	createContext,
	useContext,
	useCallback,
	useMemo,
	type ReactNode,
	useState,
} from "react";
import { createClient } from "@/lib/supabase/client";

type UserProfileContextType = {
	avatarUrl: string | undefined;
	isLoading: boolean;
	photoPath: string | null | undefined;
	refreshAvatar: (target: string, userId: string) => Promise<void>;
	saveAvatar: (
		file: File,
		target: string,
	) => Promise<{ error: string | null }>;
};

const UserProfileContext = createContext<UserProfileContextType>({
	avatarUrl: undefined,
	isLoading: false,
	photoPath: undefined,
	refreshAvatar: async () => {},
	saveAvatar: async () => ({ error: null }),
});

export function UserProfileProvider({ children }: { children: ReactNode }) {
	const [avatarUrl, setAvatarUrl] = useState<string | undefined>();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [photoPath, setPhotoPath] = useState<string | null>();

	const refreshAvatar = useCallback(async (target: string, userId: string) => {
		setIsLoading(true);

		try {
			const supabase = createClient();
			const { data, error } = await supabase
				.from(target)
				.select("*")
				.eq("id", userId)
				.single();

			if (error || !data) {
				setAvatarUrl(undefined);
				return;
			}

			let signedUrl: string | undefined;

			if (data.photo_path) {
				setPhotoPath(data.photo_path);
				const res = await fetch(
					`/api/supabase/signed-url/${target}?path=${data.photo_path}`,
					{ method: "GET" },
				);

				if (res.ok) {
					signedUrl = (await res.json()).signedUrl;
				}
			}

			setAvatarUrl(signedUrl);
		} finally {
			setIsLoading(false);
		}
	}, []);

	const saveAvatar = useCallback(
		async (
			file: File,
			target: string,
		): Promise<{ error: string | null }> => {
			setIsLoading(true);

			try {
				const body = new FormData();
				body.append("image", file);
				body.append("targetType", target);

				const res = await fetch("/api/supabase/upload-profile-image", {
					method: "POST",
					body,
				});

				if (!res.ok) {
					const data = await res.json().catch(() => ({}));
					return { error: data.error ?? "Image upload failed" };
				}

				const data = await res.json();
				setPhotoPath(data.path ?? null);

				if (data.url) {
					setAvatarUrl(data.url);
				}

				return { error: null };
			} finally {
				setIsLoading(false);
			}
		},
		[],
	);

	const value = useMemo(
		() => ({
			avatarUrl,
			isLoading,
			photoPath,
			refreshAvatar,
			saveAvatar,
		}),
		[avatarUrl, isLoading, photoPath, refreshAvatar, saveAvatar],
	);

	return (
		<UserProfileContext.Provider value={value}>
			{children}
		</UserProfileContext.Provider>
	);
}

export function useUserProfile() {
	return useContext(UserProfileContext);
}
