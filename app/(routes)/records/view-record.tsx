"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AssignmentData } from "./columns";
import Image from "next/image";

export const ViewRecord = ({ data }: { data: AssignmentData }) => {
  return (
    <div className="space-y-5 ">
      <div className="flex items-center justify-between">
        <h1 className="font-medium text-lg capitalize">
          Agent: {data.driver.user.name}
        </h1>
        {/* <p className="text-sm ">{data.status}</p> */}
      </div>
      {data.customerName && (
        <div>
          <Label htmlFor="customerName">Customer Name</Label>
          <Input
            readOnly
            id="customerName"
            autoFocus={false}
            className="focus:select-none"
            value={data.customerName}
          />
        </div>
      )}
      {data.customerPhone && (
        <div>
          <Label htmlFor="customerPhone">Customer Phone</Label>
          <Input
            readOnly
            id="customerPhone"
            autoFocus={false}
            className="focus:select-none"
            value={data.customerPhone}
          />
        </div>
      )}

      {data.amount && (
        <div>
          <Label htmlFor="amount">Amount</Label>
          <Input
            readOnly
            id="amount"
            autoFocus={false}
            className="focus:select-none"
            value={data.amount}
          />
        </div>
      )}

      {data.startAddress && (
        <div>
          <Label htmlFor="startAddress">Start Address</Label>
          <Input
            readOnly
            id="startAddress"
            autoFocus={false}
            className="focus:select-none"
            value={data.startAddress}
          />
        </div>
      )}

      {data.startTime && (
        <div>
          <Label htmlFor="startTime">Start Time</Label>
          <Input
            readOnly
            id="startTime"
            autoFocus={false}
            className="focus:select-none"
            value={new Date(data.startTime).toLocaleString()}
          />
        </div>
      )}

      {data.collectedAddress && (
        <div>
          <Label htmlFor="collectedAddress">Collected Address</Label>
          <Input
            readOnly
            id="collectedAddress"
            autoFocus={false}
            className="focus:select-none"
            value={data.collectedAddress}
          />
        </div>
      )}

      {data.collectedTime && (
        <div>
          <Label htmlFor="collectedTime">Collected Time</Label>
          <Input
            readOnly
            id="collectedTime"
            autoFocus={false}
            className="focus:select-none"
            value={new Date(data.collectedTime).toLocaleString()}
          />
        </div>
      )}

      {data.image && (
        <div>
          <Label htmlFor="collectedTime">Image</Label>
          <div className="relative aspect-video h-40 rounded-lg overflow-hidden object-contain">
            <Image src={data.image} alt={"img"} fill loading="lazy" />
          </div>
        </div>
      )}
    </div>
  );
};
