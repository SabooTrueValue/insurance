"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";

import { cn } from "@/lib/utils";

import { DriverData } from "@/actions/driver-action";
import { Badge } from "@/components/ui/badge";
import { Assignment } from "@/types";
import { currencyFormatter } from "@/components/currency-formatter";
import { ActionCell } from "@/components/action-cell";
import { RecordImageModal } from "@/app/_components/record-image-modal";

export interface AssignmentData extends Assignment {
  driver: DriverData;
  startAddress: string | null;
  collectedAddress: string | null;
}

export const columns: ColumnDef<AssignmentData>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllRowsSelected() ||
          (table.getIsSomeRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => {
          // Toggle all rows in the data (not just the current page)
          if (value) {
            table.toggleAllRowsSelected(true);
          } else {
            table.toggleAllRowsSelected(false);
          }
        }}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "customerName",
    header: "Name",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("customerName")}</div>
    ),
  },
  {
    accessorKey: "customerPhone",
    header: "Phone",
    cell: ({ row }) => <div>{row.getValue("customerPhone")}</div>,
  },
  {
    accessorKey: "image",
    header: "Images",
    cell: ({ row }) => {
      const image: string = row.getValue("image");
      return image ? <RecordImageModal image={image} /> : "No Image";
    },
  },
  {
    accessorKey: "amount",
    header: "Collected Amount",
    cell: ({ row }) => {
      const amount: string = row.getValue("amount");
      return <div>{currencyFormatter(parseInt(amount))}</div>;
    },
  },
  {
    accessorKey: "startAddress",
    header: "Start Address",
    cell: ({ row }) => {
      return <div>{row.getValue("startAddress")}</div>;
    },
  },
  {
    accessorKey: "startTime",
    header: "Start Time",
    cell: ({ row }) => {
      const startTime: Date = row.getValue("startTime");
      return (
        <div>
          {startTime ? new Date(startTime).toLocaleString("en-IN") : ""}
        </div>
      );
    },
  },
  {
    accessorKey: "collectedAddress",
    header: "Collected Address",
    cell: ({ row }) => {
      return <div>{row.getValue("collectedAddress")}</div>;
    },
  },
  {
    accessorKey: "collectedTime",
    header: "Collect Time",
    cell: ({ row }) => {
      const collectedTime: Date = row.getValue("collectedTime");
      return (
        <div>
          {collectedTime ? new Date(collectedTime).toLocaleString("en-IN") : ""}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status: string = row.getValue("status");
      return (
        <Badge
          variant="outline"
          className={cn(
            status === "ASSIGNED" && "bg-blue-500/10  text-blue-800 ",
            status === "PENDING" && "bg-orange-500/10  text-orange-800 ",
            status === "COMPLETED" && "bg-green-500/10 text-green-800"
          )}
        >
          {status}
        </Badge>
      );
    },
  },
  {
    accessorFn: (row) => row.driver.user.name,
    header: "Agent",
    id: "driver.user.name",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("driver.user.name")}</div>
    ),
  },
  {
    header: "Created At",
    id: "createdAt",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("createdAt")}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => <ActionCell data={row.original} />,
  },
];
