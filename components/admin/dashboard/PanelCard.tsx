"use client";

import React from "react";
import { Card, CardBody, CardHeader } from "@heroui/react";

export function PanelCard({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Card radius="md" className={`bg-content1 ${className}`}>
      <CardHeader className="pb-0">
        <div className="text-xl font-semibold">{title}</div>
      </CardHeader>
      <CardBody className="min-h-[240px] h-full">{children}</CardBody>
    </Card>
  );
}
