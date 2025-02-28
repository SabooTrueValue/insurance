"use client";

import { AssignmentData } from "@/app/(routes)/records/columns";
import { ViewRecord } from "@/app/(routes)/records/view-record";
import { Modal } from "@/app/_components/modal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Eye, MoreHorizontal } from "lucide-react";
import { useState } from "react";

export const ActionCell = ({ data }: { data: AssignmentData }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => setIsOpen(true)}>
            <div className="w-full flex items-center space-x-1">
              <Eye size={12} /> <span>View</span>
            </div>
          </DropdownMenuItem>
          {/* <DropdownMenuItem>
            <Link href={`/`} className="w-full flex items-center space-x-1">
              <PencilLine size={12} /> <span>Edit</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer flex items-center -space-x-1 hover:!text-red-700  hover:!bg-red-200/30"
            onClick={() => setIsOpen(true)}
          >
            <Trash size={12} /> <span>Delete</span>
          </DropdownMenuItem> */}
        </DropdownMenuContent>
      </DropdownMenu>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ViewRecord data={data} />
      </Modal>
    </>
  );
};
