"use client";

import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Role } from "@prisma/client";
import { Grid2X2, Search, Users } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { Skeleton } from "./ui/skeleton";

const items: {
  title: string;
  url: string;
  icon: React.ComponentType;
  role: Role[];
}[] = [
  {
    title: "Home",
    url: "/",
    icon: Grid2X2,
    role: [Role.ADMIN],
  },
  {
    title: "Users",
    url: "/users",
    icon: Users,
    role: [Role.ADMIN],
  },
  {
    title: "Records",
    url: "/records",
    icon: Search,
    role: [Role.ADMIN],
  },
  {
    title: "Insurance",
    url: "/insurance",
    icon: Search,
    role: [Role.DRIVER],
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession();
  const role: Role = session?.user.role;

  if (!session || !session.user) {
    return (
      <div className="w-64 border-r">
        <Skeleton className="h-10 w-32 mx-auto mt-5 mb-10" />
        <div className="space-y-5 m-5">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
      </div>
    );
  }

  // Filter sidebar items based on user role
  const filteredItems = items.filter((item) => {
    if (!item.role) {
      return true;
    }
    return item.role.includes(role);
  });

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Link href="/" className="mx-auto">
          <Image src={"/logo.png"} alt="Logo" width={100} height={100} />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {filteredItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild className="p-5" tooltip={item.title}>
                  <Link href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={session?.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
