"use server";

import { db } from "@/lib/db";
import { assignmentSchema, stepFormSchema } from "@/schema/assignment-schema";
import { DriverStatus, Status } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const getAssignments = async (startDate: Date, endDate: Date) => {
  try {
    const assignments = await db.assignment.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        createdAt: {
          gte: startDate, // Greater than or equal to startDate
          lte: endDate, // Less than or equal to endDate
        },
      },
      include: {
        driver: {
          include: {
            user: true,
          },
        },
      },
    });

    return {
      data: assignments,
      message: "success",
      status: 200,
    };
  } catch (error) {
    console.log(error);
    return {
      data: [],
      message: "Failed to fetch assignments!",
      status: 500,
    };
  }
};

// getAssignments function
export const getAssignmentsForDriver = async (driverId: string) => {
  try {
    const assignments = await db.assignment.findFirst({
      where: {
        driverId,
        status: { not: Status.COMPLETED },
      },
      include: {
        driver: {
          include: {
            user: true,
          },
        },
      },
    });

    return {
      data: assignments,
      message: "success",
      status: 200,
    };
  } catch (error) {
    console.log(error);
    return {
      data: [],
      message: "Failed to fetch assignment!",
      status: 500,
    };
  }
};

export const createAssignment = async (
  values: z.infer<typeof assignmentSchema>
) => {
  // Validate the fields using the schema
  const validatedFields = assignmentSchema.safeParse(values);

  if (!validatedFields.success) {
    // If validation fails, return with the validation error messages
    return {
      data: [],
      message: validatedFields.error.errors
        .map((err) => err.message)
        .join(", "),
      status: 400,
    };
  }

  // Extract validated values
  const {
    driverId,
    customerName,
    customerPhone,
    amount,
    startAddress,
    startTime,
    visitReason,
    count,
  } = validatedFields.data;

  const existingAssignment = await db.assignment.findFirst({
    where: {
      driverId,
      status: Status.PENDING,
    },
  });

  // If an assignment already exists, return an error message
  if (existingAssignment) {
    return {
      data: [],
      message: "An assignment for this customer already exists.",
      status: 400,
    };
  }

  try {
    const [newAssignment, updateDriverStatus] = await db.$transaction([
      db.assignment.create({
        data: {
          driverId,
          customerName,
          customerPhone,
          amount,
          startAddress,
          startTime,
          visitReason,
          status: Status.PENDING,
        },
      }),
      db.driver.update({
        where: { id: driverId },
        data: {
          status: DriverStatus.BUSY,
          count,
        },
      }),
    ]);
    console.log(updateDriverStatus);
    revalidatePath("/records");
    return {
      status: 200,
      message: "Assignment created successfully",
      data: newAssignment,
    };
  } catch (error) {
    // Log and return the error
    console.error("Error creating assignment:", error);

    return {
      data: [],
      message: "Failed to create assignment due to an internal error.",
      status: 500,
    };
  }
};

export const updateAssignment = async (
  id: string,
  driverId: string,
  values: z.infer<typeof stepFormSchema>
) => {
  const validatedFields = stepFormSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      data: [],
      message: "Please fill all the fields correctly!",
      status: 400,
    };
  }

  try {
    const updatedAssignment = await db.assignment.update({
      where: { id, driverId },
      data: {
        amount: values.amount,
        status: values.status,
        image: values.image,
        remarks: values.remarks,
        collectedAddress: values.collectedAddress,
        collectedTime: values.collectedTime,
      },
    });
    revalidatePath("/records");
    return {
      status: 200,
      message: "Assignment updated successfully",
      data: updatedAssignment,
    };
  } catch (error) {
    console.error("Error updating assignment:", error);

    return {
      data: [],
      message: "Failed to update assignment due to an internal error.",
      status: 500,
    };
  }
};

export const getCurrentDayAssignmentsCount = async (driverId: string) => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0); // Start of today

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999); // End of today

    const res = await db.assignment.count({
      where: {
        driverId,
        createdAt: {
          gte: startOfDay, // Greater than or equal to the start of the day
          lte: endOfDay, // Less than or equal to the end of the day
        },
      },
    });

    if (!res) {
      return {
        res: 0,
        message: "Success",
        status: 200,
      };
    }

    return {
      res,
      message: "success",
      status: 200,
    };
  } catch (error) {
    console.error("Error fetching assignments:", error);
  }
};
