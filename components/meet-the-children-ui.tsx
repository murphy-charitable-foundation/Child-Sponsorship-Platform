"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

import {
	Avatar,
	Card,
	CardBody,
	CardFooter,
	Divider,
	Input,
	Select,
	SelectItem,
	Selection,
	Button,
	Image,
	Slider,
	Skeleton,
	Pagination,
	Popover,
	PopoverTrigger,
	PopoverContent,
} from "@heroui/react";
import { ChildProfile } from "./admin/children/types";

const pageCapacities = ["20", "60", "100"];

export default function MeetTheChildrenUI({
	groupSponsorship,
}: {
	groupSponsorship: boolean;
}) {
	const router = useRouter();

	const supabase = createClient();

	const [selectedPageCapacity, setPageCapacity] = React.useState<Selection>(
		new Set(["20"]),
	);
	const [page, setPage] = React.useState(1);

	const [children, setChildren] = React.useState<ChildProfile[]>([]);
	const [count, setCount] = React.useState(0);
	const [ageRange, setAgeRange] = React.useState<number[]>([0, 25]);
	const [genders, setGenders] = React.useState<string[]>(["Male", "Female"]);
	const [uniqueCountries, setUniqueCountries] = React.useState<string[]>([]);
	const [searchTerm, setSearchTerm] = React.useState("");
	const pageSize = Number(Array.from(selectedPageCapacity)[0] ?? "20");
	const requestIdRef = React.useRef(0);
	const [isLoaded, setIsLoaded] = React.useState(false);

	function calculateRange() {
		const from = (page - 1) * pageSize;
		const to = from + pageSize - 1;

		return { from, to };
	}

	const fetchUniqueCountries = async () => {
		const { data: countries, error: countriesError } = await supabase
			.from("children_with_ages")
			.select("location")
			.neq("location", null)
			.eq("active", true);

		if (countriesError) {
			console.log(countriesError);
			throw countriesError;
		}

		setUniqueCountries(
			Array.from(new Set(countries.map((row) => row.location))).sort(),
		);

		setSelectedCountries(
			new Set(Array.from(new Set(countries.map((row) => row.location)))),
		);
	};

	const fetchData = async () => {
		const requestId = ++requestIdRef.current;

		setIsLoaded(false);

		const { from, to } = calculateRange();

		if (selectedCountries.size === 0) {
			console.log("no countries selected, skipping fetch");
			setChildren([]);
			setCount(0);
			setIsLoaded(true);
			return; // to resolve race condition between fetchData and fetchUniqueCountries, resulting in list being inaccurately filtered
		}

		const { data: newChildren, error: childrenError } = await supabase
			.from("children_with_ages")
			.select("*")
			.eq("active", true)
			.in("location", Array.from(selectedCountries))
			.gte("age", ageRange[0])
			.lte("age", ageRange[1])
			.in("gender", genders)
			.ilike("full_name", `%${searchTerm}%`)
			.range(from, to);

		if (requestId !== requestIdRef.current) return;

		if (childrenError) {
			console.log(childrenError);
			throw childrenError;
		}

		let signedUrls: Record<string, string> = {};
		const photoPaths: string[] = [];
		for (const child of newChildren ?? []) {
			if (child.photo_path) photoPaths.push(child.photo_path);
		}

		if (photoPaths.length > 0) {
			const res = await fetch("/api/supabase/signed-url/children", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ paths: photoPaths }),
			});
			if (res.ok) ({ signedUrls } = await res.json());
		}

		const childrenWithUrls = (newChildren || []).map((child) => ({
			...child,
			image_url: child.photo_path ? signedUrls[child.photo_path] : undefined,
		}));
		setChildren(childrenWithUrls as ChildProfile[]);

		const { count, error: countError } = await supabase
			.from("children_with_ages")
			.select("id", { count: "exact", head: true })
			.eq("active", true)
			.in("location", Array.from(selectedCountries))
			.gte("age", ageRange[0])
			.lte("age", ageRange[1])
			.in("gender", genders)
			.ilike("full_name", `%${searchTerm}%`);

		if (requestId !== requestIdRef.current) return;

		if (countError) {
			console.log(countError);
			throw countError;
		}
		setCount(count || 0);

		setIsLoaded(true);
	};

	const [selectedCountries, setSelectedCountries] = React.useState<Set<string>>(
		new Set(),
	);

	useEffect(() => {
		// Fetch new data when page or filters change
		//fetchUniqueCountries();
		console.log("fetching data for page ", page);
		fetchData()
			.then(() => console.log("fetched data"))
			.catch(console.log);
	}, [
		page,
		selectedCountries,
		ageRange,
		genders,
		searchTerm,
		selectedPageCapacity,
	]);

	useEffect(() => {
		console.log("fetching unique countries");
		fetchUniqueCountries();
		console.log("fetched unique countries");
	}, []); // Fetch unique countries on component mount

	return (
		<main className="min-h-screen bg-background text-foreground">
			<div className="mx-auto w-full max-w-7xl px-4 py-10">
				<h1 className="text-2xl font-semibold">Meet the Children</h1>

				<Divider />
				<p className="text-default-500 py-4">
					Browse children waiting for sponsorship
				</p>

				<div
					id="filters"
					className="gap-2 grid grid-cols-2 sm:grid-cols-5 my-4 p-4 border border-default-200 rounded-[12px]"
				>
					<Input
						label="Search"
						labelPlacement="inside"
						variant="bordered"
						radius="md"
						size="sm"
						classNames={{ inputWrapper: "rounded-[12px]" }}
						onChange={(e) => setSearchTerm(e.target.value)}
						value={searchTerm}
					/>
					<Select
						label="Countries"
						labelPlacement="inside"
						variant="bordered"
						radius="md"
						size="sm"
						classNames={{ trigger: "rounded-[12px]" }}
						selectedKeys={selectedCountries}
						selectionMode="multiple"
						onSelectionChange={(keys) =>
							setSelectedCountries(keys as Set<string>)
						}
						//defaultSelectedKeys={uniqueCountries} // redundant
					>
						{uniqueCountries.map((country) => (
							<SelectItem key={country}>{country}</SelectItem>
						))}
					</Select>

					<Popover
						placement="bottom"
						showArrow={true}
						classNames={{ trigger: "rounded-[12px]" }}
					>
						<PopoverTrigger>
							<Button
								className="capitalize"
								variant="bordered"
								radius="md"
							>
								Age Range: {ageRange[0]}-{ageRange[1]}
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-80 p-4">
							<Slider
								className="w-full"
								defaultValue={[0, 25]}
								label="Age Range"
								marks={[
									{
										value: 0,
										label: "0",
									},
									{
										value: 5,
										label: "5",
									},
									{
										value: 10,
										label: "10",
									},
									{
										value: 15,
										label: "15",
									},
									{
										value: 20,
										label: "20",
									},
									{
										value: 25,
										label: "25",
									},
								]}
								maxValue={25}
								minValue={0}
								showTooltip={true}
								step={1}
								//onChange={setAgeRange}
								onChange={(keys) => setAgeRange(keys as number[])}
								value={ageRange}
							/>
						</PopoverContent>
					</Popover>

					<Select
						onSelectionChange={(keys) =>
							setGenders(Array.from(keys) as string[])
						}
						selectedKeys={genders}
						selectionMode="multiple"
						label="Genders"
						labelPlacement="inside"
						variant="bordered"
						radius="md"
						size="sm"
						classNames={{ trigger: "rounded-[12px]" }}
					>
						<SelectItem key="Male">Male</SelectItem>
						<SelectItem key="Female">Female</SelectItem>
					</Select>
					<Button
						variant="bordered"
						color="danger"
						radius="md"
						size="md"
						onPress={() => {
							setSelectedCountries(new Set(uniqueCountries));
							setAgeRange([0, 25]);
							setSearchTerm("");
							setGenders(["Male", "Female"]);
							setPage(1);
						}}
					>
						Clear Filters
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="size-6"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
							/>
						</svg>
					</Button>
				</div>
				<p className="text-default-500 text-sm py-2">
					Showing {count} children
				</p>

				<div
					id="children-grid"
					className="gap-2 grid grid-cols-2 sm:grid-cols-4"
				>
					{children.map((item, index) => (
						/* eslint-disable no-console */
						<Card
							key={item.id}
							isPressable
							shadow="sm"
							onPress={() => router.push(`/child-profile/${item.id}`)}
						>
							<Skeleton
								className="rounded-lg"
								isLoaded={isLoaded}
							>
								<CardBody className="overflow-visible p-0">
									{item.image_url ? (
										<Image
											removeWrapper
											radius="none"
											src={item.image_url}
											alt={item.full_name}
											className="w-full h-[160px] object-cover object-[center_30%]"
										/>
									) : (
										<Avatar
											radius="none"
											color="primary"
											className="w-full object-cover h-[160px]"
										/>
									)}
								</CardBody>
								<CardFooter className="text-small">
									<div className="text-left">
										<b>{item.full_name}</b>
										<p className="text-default-500">
											{" "}
											Age: {item.age}
											{item.location ? `, ${item.location}` : ""}
										</p>
										<p className="text-default-500">
											{"Grade: " + (item.school_grade ?? "N/A")}
										</p>
										<p className="text-default-500">
											{"Dream job: " + (item.dream_job ?? "N/A")}
										</p>
										<p className="text-default-500">
											{"Favorite activity: " +
												(item.favorite_activity ?? "N/A")}
										</p>
									</div>
								</CardFooter>
							</Skeleton>
						</Card>
					))}
				</div>
				<div className="flex items-center mt-4 justify-center">
					<Pagination
						showControls
						onChange={setPage}
						page={page}
						initialPage={1}
						total={Math.ceil(count / pageSize)}
						className="my-4 flex justify-center"
						color="primary"
						variant="bordered"
					/>
					{}
					<span className="text-sm text-default-500 whitespace-nowrap mx-4">
						Items per page:
					</span>
					<Select
						aria-label="Items per page"
						variant="bordered"
						fullWidth={false}
						defaultSelectedKeys={["20"]}
						selectedKeys={selectedPageCapacity}
						onSelectionChange={(keys) => {
							setPageCapacity(keys as Set<string>);
							setPage(1);
						}}
					>
						{pageCapacities.map((capacity) => (
							<SelectItem key={capacity.toString()}>
								{capacity.toString()}
							</SelectItem>
						))}
					</Select>
				</div>
			</div>
		</main>
	);
}
