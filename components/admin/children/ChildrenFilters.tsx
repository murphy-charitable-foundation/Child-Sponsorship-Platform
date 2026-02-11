"use client";

import { Input, Select, SelectItem, Button } from "@heroui/react";

export default function ChildrenFilters() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 items-end">
        {/* Search */}
        <div className="lg:col-span-6">
          <div className="mb-1 text-sm font-medium text-default-700">
            Who are you looking for?
          </div>
          <Input
            placeholder=""
            radius="md"
            variant="bordered"
            isClearable
          />
        </div>

        {/* Gender */}
        <div className="lg:col-span-3">
          <div className="mb-1 text-sm font-medium text-default-700">
            Gender
          </div>
          <Select
            placeholder="Select gender"
            radius="md"
            variant="bordered"
          >
            <SelectItem key="male">Male</SelectItem>
            <SelectItem key="female">Female</SelectItem>
            <SelectItem key="other">Other</SelectItem>
          </Select>
        </div>

        {/* Status */}
        <div className="lg:col-span-3">
          <div className="mb-1 text-sm font-medium text-default-700">
            Status
          </div>
          <Select
            radius="md"
            variant="bordered"
            selectedKeys={["active", "waiting", "exited"]}
            renderValue={() => (
              <span>
                <span className="text-success">Active</span>,{" "}
                <span className="text-warning">Waiting</span>,{" "}
                <span className="text-default-500">Exited</span>
              </span>
            )}
          >
            <SelectItem key="active">Active</SelectItem>
            <SelectItem key="waiting">Waiting</SelectItem>
            <SelectItem key="exited">Exited</SelectItem>
          </Select>
        </div>
      </div>

      {/* Reset filters */}
      <div className="mt-3 flex justify-end">
        <Button
          variant="light"
          size="sm"
          className="text-primary font-medium"
        >
          Reset filters
        </Button>
      </div>
    </div>
  );
}
