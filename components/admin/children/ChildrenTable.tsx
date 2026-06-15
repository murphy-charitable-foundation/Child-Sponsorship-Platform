"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Chip,
} from "@heroui/react";

type ChildRow = {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  location: string;
  status: "Active" | "Waiting" | "Exited";
  dateEnrolled: string;
};

const rows: ChildRow[] = [
  {
    id: "C-1001",
    firstName: "Rebecca",
    lastName: "Akello",
    age: 9,
    gender: "Female",
    location: "Uganda ",
    status: "Active",
    dateEnrolled: "Jan 12, 2026",
  },
  {
    id: "C-1002",
    firstName: "Ruth",
    lastName: "Babriye",
    age: 11,
    gender: "Male",
    location: "Uganda",
    status: "Waiting",
    dateEnrolled: "Jan 10, 2026",
  },
  {
    id: "C-1003",
    firstName: "Agnes",
    lastName: "Katende",
    age: 10,
    gender: "Female",
    location: "Uganda",
    status: "Exited",
    dateEnrolled: "Dec 22, 2025",
  },
];

function statusChipColor(status: "Active" | "Waiting" | "Exited") {
  if (status === "Active") return "success";
  if (status === "Waiting") return "warning";
  return "default"; // for Exited
}

type ChildrenTableProps = {
  selectedStatus: Set<string>;
  selectedGender: Set<string>;
  searchQuery: string;
};

export default function ChildrenTable({
  selectedStatus,
  selectedGender,
  searchQuery,
}: ChildrenTableProps) {
  const router = useRouter();

  // Filter rows based on selection
  const filtered = rows.filter((row) => {
    // Status filter
    const statusMatches =
      selectedStatus.has("all") ||
      selectedStatus.has(row.status.toLowerCase());

    // Gender filter
    const genderMatches =
      selectedGender.size === 0 ||
      selectedGender.has(row.gender.toLowerCase());

    // Search filter
    const searchMatches =
      !searchQuery ||
      row.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.lastName.toLowerCase().includes(searchQuery.toLowerCase());

    return statusMatches && genderMatches && searchMatches;
  });

  return (
    <div className="w-full">
      <Table
        aria-label="Children table"
        removeWrapper
        onRowAction={(key) => router.push(`/admin/children/${key}`)}
        classNames={{ tr: "cursor-pointer" }}
      >
        <TableHeader>
          <TableColumn>LAST NAME</TableColumn>
          <TableColumn>FIRST NAME</TableColumn>
          <TableColumn>ID</TableColumn>
          <TableColumn>AGE</TableColumn>
          <TableColumn>GENDER</TableColumn>
          <TableColumn>LOCATION</TableColumn>
          <TableColumn>STATUS</TableColumn>
          <TableColumn>DATE ENROLLED</TableColumn>
          <TableColumn>ACTIONS</TableColumn>
        </TableHeader>

        <TableBody emptyContent={"No children found"} items={filtered}>
          {(r) => (
            <TableRow key={r.id}>
              <TableCell>{r.lastName}</TableCell>
              <TableCell>{r.firstName}</TableCell>
              <TableCell>{r.id}</TableCell>
              <TableCell>{r.age}</TableCell>
              <TableCell>{r.gender}</TableCell>
              <TableCell>{r.location}</TableCell>
              <TableCell>
                <Chip
                  size="md"
                  radius="full"
                  variant="flat"
                  color={statusChipColor(r.status)}
                  className="px-4 text-base"
                >
                  {r.status}
                </Chip>
              </TableCell>
              <TableCell>{r.dateEnrolled}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    as={Link}
                    href={`/admin/children/${r.id}`}
                    size="sm"
                    radius="md"
                    color="primary"
                  >
                    View
                  </Button>
                  <Button
                    as={Link}
                    href="/admin/children/editpage"
                    size="sm"
                    radius="md"
                    color="primary"
                  >
                    Edit
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
