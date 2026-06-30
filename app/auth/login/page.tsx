"use client";

import { LoginForm } from "@/components/login-form";
import { SignUpForm } from "@/components/sign-up-form";
import { Card, CardBody, Tab, Tabs } from "@heroui/react";
import { useState } from "react";

export default function Page() {
  const [selected, setSelected] = useState("login");

  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-primary p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Card className="mt-6 rounded-[12px] border border-default-200 shadow-none">
          <CardBody>
            <Tabs
              fullWidth
              aria-label="Sponsor authentication"
              selectedKey={selected}
              size="md"
              color="primary"
              onSelectionChange={(key) => setSelected(String(key))}
            >
              <Tab key="login" title="Log In">
                <LoginForm />
              </Tab>
              <Tab key="sign-up" title="Sign Up">
                <SignUpForm />
              </Tab>
            </Tabs>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
