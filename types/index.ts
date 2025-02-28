import { DriverStatus, Role, Status } from "@prisma/client";

export interface User {
  id: string;
  name: string;
  phone: string;
  email?: string | null;
  // password: string;
  role: Role;
}

export interface Driver {
  id: string;
  userId: string;
  employeeId: string;
  status: DriverStatus;
}

export interface Assignment {
  id: string;
  driverId: string;
  customerName: string | null;
  customerPhone: string | null;
  amount: string;
  startAddress: string | null;
  collectedAddress: string | null;
  startTime: Date | null;
  collectedTime: Date | null;
  image: string | null;
  status: Status;
}
