"use server";

import { db } from "@/lib/db";
import { Driver, User } from "@/types";
import { DriverStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

export interface DriverData extends Driver {
  user: User;
}

interface DriverResponse {
  data?: DriverData[];
  message: string;
  status: number;
}

export const getDrivers = async (): Promise<DriverResponse> => {
  try {
    const drivers = await db.driver.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            role: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!drivers || drivers.length === 0) {
      return {
        message: "No drivers found.",
        status: 404,
      };
    }

    return {
      data: drivers,
      message: "success",
      status: 200,
    };
  } catch (error) {
    console.error("Error fetching drivers:", error);
    return {
      message: "Failed to fetch drivers!",
      status: 500,
    };
  }
};

export const getDriverById = async (id: string) => {
  const driver = await db.driver.findUnique({
    where: { userId: id },
  });

  return driver;
};

export const updateDriverStatus = async (id: string, status: DriverStatus) => {
  try {
    await db.driver.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });
    revalidatePath("/insurance");

    return {
      message: "success!",
      status: 200, // OK
    };
  } catch (error) {
    console.log(error);
    return {
      message: "Failed to update status!",
      status: 500,
    };
  }
};
