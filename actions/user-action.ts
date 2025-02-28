"use server";

import { hash } from "bcryptjs";
import { z } from "zod";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { userExtendedSchema } from "@/schema/user-schema";
import { Driver, User } from "@/types";
import { Role } from "@prisma/client";
import { revalidatePath } from "next/cache";

export interface UserData extends User {
  driver: Driver | null;
}

interface UserResponse {
  data: UserData[] | [];
  message: string;
  status: number;
}

export const getUsers = async (): Promise<UserResponse> => {
  const session = await auth();

  if (!session) {
    return {
      data: [],
      message: "You are not authenticated!",
      status: 401,
    };
  }

  if (session?.user.role !== Role.ADMIN) {
    return {
      data: [],
      message: "You are not authorized to perform this action!",
      status: 403,
    };
  }

  const users = await db.user.findMany({
    take: 100,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      driver: true,
    },
  });

  return {
    data: users,
    message: "success",
    status: 200,
  };
};

export const createUser = async (
  values: z.infer<typeof userExtendedSchema>
) => {
  const validatedFields = userExtendedSchema.safeParse(values);

  if (!validatedFields.success) {
    console.log(validatedFields.error.errors);
    return {
      message: "Invalid fields",
      status: 400,
    };
  }

  const { name, phone, email, role, employeeId } = validatedFields.data;

  if (role === Role.DRIVER && !employeeId) {
    return {
      data: [],
      message: "Please provide an employee Id for the driver!",
      status: 400,
    };
  }

  if (role === Role.DRIVER && employeeId) {
    const verifyEmployeeId = await db.driver.findUnique({
      where: {
        employeeId,
      },
    });
    if (verifyEmployeeId) {
      return {
        message: "Agent with this employeeId already exists",
        status: 400,
      };
    }
  }

  //validate if user phone already exists
  const existingUser = await db.user.findUnique({
    where: {
      phone: phone,
    },
  });

  if (existingUser) {
    return {
      message: "User with this phone number already exists",
      status: 400,
    };
  }

  const trimmedName = name.trim();
  const firstFourCharsOfName = trimmedName.toLowerCase().slice(0, 4);
  const password = firstFourCharsOfName + employeeId;
  const hashedPassword = await hash(password, 10);

  const result = await db.$transaction(async (prisma) => {
    let user;
    try {
      // Create the user within the transaction
      user = await prisma.user.create({
        data: {
          name,
          phone,
          email,
          role,
          password: hashedPassword,
        },
      });

      // If the role is DRIVER, create driver and associate with showroom
      if (role === Role.DRIVER && employeeId) {
        await prisma.driver.create({
          data: {
            userId: user.id,
            employeeId: employeeId,
          },
        });
      }

      revalidatePath("/users");
      return {
        data: user,
        message: "User created successfully!",
        status: 200, // OK
      };
    } catch (error) {
      console.log(error);
      return {
        data: null,
        message: "Failed to create!",
        status: 500, // Internal Server Error
      };
    }
  });

  return {
    data: result,
    message: "success",
    status: 200,
  };
};
