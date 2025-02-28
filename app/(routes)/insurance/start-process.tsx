"use client";

import { AssignForm } from "@/app/_components/forms/assign-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

export const StartProcess = ({
  driverId,
  count,
}: {
  driverId: string;
  count: number;
}) => {
  const [start, setStart] = useState<boolean>(false);

  return (
    <>
      {!start && (
        <div className="flex min-h-[calc(100vh-160px)] items-center justify-center">
          <Button
            onClick={() => setStart(true)}
            className="rounded-full px-24 py-32 bg-blue-600 text-xl"
          >
            Start Today
          </Button>
        </div>
      )}

      {start && (
        <Card className="max-w-screen-xl">
          {/* <CardHeader>
            <CardTitle>Insurance</CardTitle>
            <CardDescription>Collect the amount from customer.</CardDescription>
          </CardHeader> */}
          <CardContent>
            <AssignForm driverId={driverId} count={count} />
          </CardContent>
        </Card>
      )}
    </>
  );
};
