"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { AssignmentData } from "./columns";

export const ViewRecord = ({ data }: { data: AssignmentData }) => {
  const [isImageLoading, setImageLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  // Function to handle image error (fallback behavior)
  const handleImageError = () => {
    setHasError(true);
    setImageLoading(false);
  };
  return (
    <div className="space-y-5 ">
      <div className="flex items-center justify-between">
        <h1 className="font-medium text-lg capitalize">
          Agent: {data.driver.user.name}
        </h1>
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

          {hasError ? (
            <div className="text-center text-red-500">
              <p>Failed to load image</p>
            </div>
          ) : (
            <div className="relative aspect-video h-40 rounded-lg overflow-hidden object-contain">
              {/* Image loader */}
              {isImageLoading && (
                <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50">
                  <Loader className="animate-spin" />
                </div>
              )}

              <Image
                src={data.image}
                alt="Image preview"
                fill
                objectFit="cover"
                onLoadingComplete={() => setImageLoading(false)}
                onError={handleImageError} // Set error if image fails to load
                className={`transition-all duration-700 ease-in-out ${
                  isImageLoading ? "blur-2xl grayscale" : "blur-0 grayscale-0"
                }`}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
