"use client";

import React from "react";
import { Card, CardBody } from "@heroui/react";

export function ChartPlaceholder({ label }: { label: string }) {
  return (
    <Card radius="md" className="bg-default-100">
      <CardBody className="min-h-[220px] flex items-center justify-center">
        <span className="text-default-500">{label}</span>
      </CardBody>
    </Card>
  );
}
