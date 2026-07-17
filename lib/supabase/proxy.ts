import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { hasEnvVars } from "../utils";

const PUBLIC_PATH = ["/terms", "/privacy", "/auth", "/about-us"];

export async function updateSession(request: NextRequest) {
	let supabaseResponse = NextResponse.next({
		request,
	});

	// If the env vars are not set, skip proxy check. You can remove this
	// once you setup the project.
	if (!hasEnvVars) {
		return supabaseResponse;
	}

	// With Fluid compute, don't put this client in a global environment
	// variable. Always create a new one on each request.
	const supabase = createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
		{
			cookies: {
				getAll() {
					return request.cookies.getAll();
				},
				setAll(cookiesToSet) {
					cookiesToSet.forEach(({ name, value }) =>
						request.cookies.set(name, value),
					);
					supabaseResponse = NextResponse.next({
						request,
					});
					cookiesToSet.forEach(({ name, value, options }) =>
						supabaseResponse.cookies.set(name, value, options),
					);
				},
			},
		},
	);

	// Do not run code between createServerClient and
	// supabase.auth.getClaims(). A simple mistake could make it very hard to debug
	// issues with users being randomly logged out.

	// IMPORTANT: If you remove getClaims() and you use server-side rendering
	// with the Supabase client, your users may be randomly logged out.
	const { data } = await supabase.auth.getClaims();
	const user = data?.claims;
	const url = request.nextUrl.clone();

	const isPublicPath =
		request.nextUrl.pathname === "/" ||
		PUBLIC_PATH.some((path) => request.nextUrl.pathname.startsWith(path));

	const isAdminPath = request.nextUrl.pathname.startsWith("/admin");
	const isApiPath = request.nextUrl.pathname.startsWith("/api");

	if (!user && !isPublicPath) {
		// no user, potentially respond by redirecting the user to the login page
		if (isAdminPath) {
			url.pathname = "/auth/admin-login";
		} else {
			url.pathname = "/auth/login";
		}

		return NextResponse.redirect(url);
	}

	if (!user) return supabaseResponse;

	//Use app_metadata.role for checking role and give the permission for pages.
	//we don't want to use user_metadata because it's editable from logged in user's browser console.
	const role = user.app_metadata?.role;

	if (!role && !isPublicPath) {
		// authenticated but no approved role (e.g. pending_admin) — block protected paths
		url.pathname = "/";
		return NextResponse.redirect(url);
	}

	if (role === "sponsor") {
		if (isAdminPath && !isApiPath) {
			url.pathname = "/";
			return NextResponse.redirect(url);
		}
	} else if (role === "pending_admin") {
		// If pending admin tried to access admin or sponsor page redirect to screen for pending page.,
		if (
			!isApiPath &&
			request.nextUrl.pathname !== "/profile" &&
			(!isPublicPath || isAdminPath)
		) {
			url.pathname = "/auth/pending-approval";
			return NextResponse.redirect(url);
		}
	} else if (role === "super_admin" || role === "admin") {
		if (!isAdminPath && !isApiPath) {
			url.pathname = "/admin/dashboard";
			return NextResponse.redirect(url);
		}
	}

	// IMPORTANT: You *must* return the supabaseResponse object as it is.
	// If you're creating a new response object with NextResponse.next() make sure to:
	// 1. Pass the request in it, like so:
	//    const myNewResponse = NextResponse.next({ request })
	// 2. Copy over the cookies, like so:
	//    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
	// 3. Change the myNewResponse object to fit your needs, but avoid changing
	//    the cookies!
	// 4. Finally:
	//    return myNewResponse
	// If this is not done, you may be causing the browser and server to go out
	// of sync and terminate the user's session prematurely!

	return supabaseResponse;
}
