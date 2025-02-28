"use client";

import { updateDriverStatus } from "@/actions/driver-action";
import { DriverStatus } from "@prisma/client";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

export const GoOfficeBtn = ({ driverId }: { driverId: string }) => {
  const handleClick = async () => {
    const status = DriverStatus.OFFICE;
    try {
      const res = await updateDriverStatus(driverId, status);
      if (res?.status === 200) {
        toast.success(res.message);
      } else {
        toast.error(res?.message || "Something went wrong!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <Button
      className="w-full py-5 flex"
      size={"lg"}
      type="submit"
      variant={"destructive"}
      onClick={() => handleClick()}
    >
      Go to Showroom
    </Button>
  );
};
