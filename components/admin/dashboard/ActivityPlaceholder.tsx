"use client";

import React from "react";
import { Card, CardBody } from "@heroui/react";

export function ActivityPlaceholder() {
  return (
    <Card radius="md" className="bg-default-100">
      <CardBody className="space-y-3">
        {[].map((t) => (
          <div
            key={t}
            className="rounded-md bg-content1 px-3 py-2 text-sm text-default-600"
          >
            {t}
          </div>
        ))}
      </CardBody>
    </Card>
  );
}
