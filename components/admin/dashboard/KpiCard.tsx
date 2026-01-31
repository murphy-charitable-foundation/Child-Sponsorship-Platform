"use client";

import React from "react";
import { Card, CardBody } from "@heroui/react";

type KpiCardProps = {
  title: string;
  subtitle?: string;
};

export function KpiCard({ title, subtitle = "Need KPI visualization" }: KpiCardProps) {
  return (
    <Card radius="md" className="bg-primary-100">

      <CardBody className="py-8 flex flex-col items-center justify-center text-center">
        <div className="text-xl font-medium text-default-900">{title}</div>
        <div className="mt-3 text-base text-default-600">{subtitle}</div>
      </CardBody>
    </Card>
  );
}
