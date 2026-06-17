"use client";

import { AdminLoginForm } from "@/components/admin-login-form";
import { AdminSignUpForm } from "@/components/admin-sign-up-form";
import React from "react";
import { Tabs, Tab, Input, Link, Button, Card, CardBody } from "@heroui/react";

export default function Page() {
	const [selected, setSelected] = React.useState("login");

	return (
		<div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
			<div className="w-full max-w-sm">
				<Card className="mt-6 rounded-[12px] border border-default-200 shadow-none">
					<CardBody className="">
						<Tabs
							fullWidth
							aria-label="Tabs form"
							selectedKey={selected}
							size="md"
							color="secondary"
							onSelectionChange={(key) => setSelected(key as string)}
						>
							<Tab
								key="login"
								title="Log In"
							>
								<AdminLoginForm />
							</Tab>
							<Tab
								key="sign-up"
								title="Sign Up"
							>
								<AdminSignUpForm />
							</Tab>
						</Tabs>
					</CardBody>
				</Card>
			</div>
		</div>
	);
}
