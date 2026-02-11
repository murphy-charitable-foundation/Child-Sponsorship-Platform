"use client";

import React from "react";
import {
  Card,

  CardBody,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react";

type DonationRow = {
  id: string;
  donor: string;
  amount: string;
  date: string;
  status: "Completed" | "Pending";
};

const rows: DonationRow[] = [
  {
    id: "D-1001",
    donor: "John Smith",
    amount: "$120",
    date: "Jan 12, 2026",
    status: "Completed",
  },
  {
    id: "D-1002",
    donor: "Carry Johnes",
    amount: "$60",
    date: "Jan 11, 2026",
    status: "Pending",
  },
  {
    id: "D-1003",
    donor: "Meera Patel",
    amount: "$250",
    date: "Jan 10, 2026",
    status: "Completed",
  },
  {
    id: "D-1004",
    donor: "David Chen",
    amount: "$40",
    date: "Jan 09, 2026",
    status: "Completed",
  },
];

export default function RecentDonationsTable() {
  return (
    <Card radius="md" className="bg-content1">
     

      <CardBody>
        <Table aria-label="Recent donations table">
          <TableHeader>
            <TableColumn>ID</TableColumn>
            <TableColumn>Donor</TableColumn>
            <TableColumn>Amount</TableColumn>
            <TableColumn>Date</TableColumn>
            <TableColumn>Status</TableColumn>
          </TableHeader>

          <TableBody>
            {rows.map((r) => (
              <TableRow key={r.id}>
                <TableCell>{r.id}</TableCell>
                <TableCell>{r.donor}</TableCell>
                <TableCell>{r.amount}</TableCell>
                <TableCell>{r.date}</TableCell>
                <TableCell>
                  <span
                    className={
                      r.status === "Completed"
                        ? "text-success font-medium"
                        : "text-warning font-medium"
                    }
                  >
                    {r.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardBody>
    </Card>
  );
}
