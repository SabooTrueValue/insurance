import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { DriverStatus, Role } from "@prisma/client";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();

  const driversCount = await db.driver.count();
  const driversAvailable = await db.driver.count({
    where: {
      status: DriverStatus.AVAILABLE,
    },
  });
  const busyDrivers = await db.driver.count({
    where: {
      NOT: {
        status: DriverStatus.AVAILABLE,
      },
    },
  });

  if (session && session.user.role === Role.DRIVER) {
    redirect("/insurance");
  }

  return (
    <div className="w-full p-5">
      <div className="grid grid-cols-4 gap-5">
        <Card>
          <CardHeader>
            <CardTitle>Total Agents</CardTitle>
          </CardHeader>
          <CardContent>{driversCount}</CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Available Agents</CardTitle>
          </CardHeader>
          <CardContent>{driversAvailable}</CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Current Busy Agents</CardTitle>
          </CardHeader>
          <CardContent>{busyDrivers}</CardContent>
        </Card>

        {/* <Card>
          <CardHeader>
            <CardTitle>Total Drivers</CardTitle>
          </CardHeader>
          <CardContent>12</CardContent>
        </Card> */}
      </div>
    </div>
  );
}
