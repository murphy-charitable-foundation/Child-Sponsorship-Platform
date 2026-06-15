"use client";

import { useState } from "react";
import { Input, Select, SelectItem, Button } from "@heroui/react";

const STATUS_OPTIONS = ["active", "waiting", "exited"];

export default function ChildrenFilters() {
  const [selectedStatus, setSelectedStatus] = useState<Set<string>>(new Set(STATUS_OPTIONS));
  const [selectedGender, setSelectedGender] = useState<Set<string>>(new Set());

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
            selectedKeys={selectedGender}
            onSelectionChange={(keys) => setSelectedGender(new Set(Array.from(keys as Set<string>)))}
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
            selectedKeys={selectedStatus}
            onSelectionChange={(keys) => {
              const newKeys = new Set(Array.from(keys as Set<string>));

              // If "all" was just selected, select all individual statuses
              if (newKeys.has("all")) {
                setSelectedStatus(new Set(STATUS_OPTIONS));
              }
              // If an individual status is selected (and "all" is no longer there), remove "all" and keep individual selections
              else if (newKeys.size > 0) {
                newKeys.delete("all");
                setSelectedStatus(newKeys);
              }
              // Allow empty selection
              else {
                setSelectedStatus(new Set());
              }
            }}
            renderValue={(items) => {
              const allThreeSelected = items.length === 3 && items.every((item) => STATUS_OPTIONS.includes(item.key as string));
              return (
                <span className="flex gap-2">
                  {items.length === 0 ? (
                    <span className="text-default-500">No status selected</span>
                  ) : allThreeSelected ? (
                    <span className="text-default-700">All statuses</span>
                  ) : (
                    items.map((item) => (
                      <span
                        key={item.key}
                        className={
                          item.key === "active"
                            ? "text-success"
                            : item.key === "waiting"
                              ? "text-warning"
                              : "text-default-500"
                        }
                      >
                        {item.textValue}
                      </span>
                    ))
                  )}
                </span>
              );
            }}
          >
            <SelectItem key="all">All statuses</SelectItem>
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
          onPress={() => {
            setSelectedStatus(new Set(STATUS_OPTIONS));
            setSelectedGender(new Set());
          }}
        >
          Reset filters
        </Button>
      </div>
    </div>
  );
}
