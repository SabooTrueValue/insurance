"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";

import { cn } from "@/lib/utils";

import { UserData } from "@/actions/user-action";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<UserData>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
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
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => <div>{row.getValue("phone")}</div>,
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const role: string = row.getValue("role");
      return (
        <Badge
          variant="outline"
          className={cn(
            role === "ADMIN" && "bg-sky-500/10  text-sky-800 ",
            role === "DRIVER" && "bg-fuchsia-500/10 text-fuchsia-800"
          )}
        >
          {role === "DRIVER" ? "AGENT" : role}
        </Badge>
      );
    },
  },
  {
    accessorFn: (row) => row.driver?.status,
    header: "Status",
    id: "driver.status",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("driver.status")}</div>
    ),
  },
  {
    accessorFn: (row) => row.driver?.employeeId,
    header: "Employee Id",
    id: "driver.employeeId",
    cell: ({ row }) => <div>{row.getValue("driver.employeeId")}</div>,
  },
];
