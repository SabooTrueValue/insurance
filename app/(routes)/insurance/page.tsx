import { getAssignmentsForDriver } from "@/actions/assignment-action";
import { getDriverById } from "@/actions/driver-action";
import { AssignFormStep } from "@/app/_components/forms/assign-step2-form";
import { OptionForm } from "@/app/_components/option-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { DriverStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { StartProcess } from "./start-process";

const Insurance = async () => {
  const session = await auth();

  // If the session does not exist, redirect to the sign-in page
  if (!session) {
    redirect("/auth/sign-in");
  }

  const userId = session.user.id;

  try {
    // Fetch the driver details by user ID
    const driver = await getDriverById(userId as string);

    // If no driver is found, return an error message
    if (!driver) {
      redirect("/auth/sign-in");
    }

    // Fetch the existing assignment for the driver
    const existingAssignment = await getAssignmentsForDriver(driver.id);

    // Check if the driver is busy and no assignment exists
    if (driver.status === DriverStatus.BUSY && !existingAssignment?.data) {
      return <OptionForm driverId={driver.id} count={driver.count} />;
    }

    if (driver.status === DriverStatus.OFFICE && !existingAssignment?.data) {
      return (
        <form
          action={async () => {
            "use server";
            await db.driver.update({
              where: {
                id: driver.id,
              },
              data: {
                status: DriverStatus.AVAILABLE,
                count: 0,
              },
            });
            revalidatePath("/insurance");
          }}
          className="flex min-h-[calc(100vh-160px)] items-center justify-center"
        >
          <Button
            type="submit"
            className="w-full bg-blue-600 rounded-full px-24 py-32"
          >
            Reached Office
          </Button>
        </form>
      );
    }

    // Check if there is an existing assignment for the driver
    if (existingAssignment?.data && !Array.isArray(existingAssignment.data)) {
      return (
        <Card className="max-w-screen-xl">
          {/* <CardHeader>
            <CardTitle>Insurance</CardTitle>
            <CardDescription>Collect the amount from customer.</CardDescription>
          </CardHeader> */}
          <CardContent>
            <AssignFormStep
              formId={existingAssignment.data.id}
              driverId={driver.id}
            />
          </CardContent>
        </Card>
      );
    }

    // If no assignment exists and the driver is available, show the form to create a new assignment
    if (!existingAssignment?.data && driver.status === DriverStatus.AVAILABLE) {
      return (
        <>
          <StartProcess driverId={driver.id} count={driver.count || 0} />
        </>
      );
    }
  } catch (error) {
    console.error("Error fetching driver:", error);
    return (
      <div>
        <p>Something went wrong. Please try again later.</p>
      </div>
    );
  }
};

export default Insurance;
