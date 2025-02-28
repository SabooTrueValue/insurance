"use client";

import { GoOfficeBtn } from "@/components/go-office-btn";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { AssignForm } from "./forms/assign-form";

export const OptionForm = ({
  driverId,
  count,
}: {
  driverId: string;
  count: number;
}) => {
  const [continueForm, setContinueForm] = useState<boolean>(false);

  return (
    <>
      {count !== 5 ? (
        !continueForm ? (
          <div className="space-y-5 min-h-[calc(100vh-160px)] p-5 flex flex-col items-center justify-center">
            <Button
              className="w-full bg-blue-600 py-5 "
              size={"lg"}
              onClick={() => setContinueForm(true)}
            >
              Collect {count + 1} Customer Payment (కొనసాగించండి)
            </Button>

            <GoOfficeBtn driverId={driverId} />
          </div>
        ) : (
          <Card className="max-w-screen-xl">
            <CardHeader>
              <CardTitle>Insurance</CardTitle>
              <CardDescription>
                Collect the amount from customer.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AssignForm driverId={driverId} count={count} />
            </CardContent>
          </Card>
        )
      ) : (
        <div className="flex min-h-[calc(100vh-60px)] items-center justify-center">
          <GoOfficeBtn driverId={driverId} />
        </div>
      )}
    </>
  );
};
