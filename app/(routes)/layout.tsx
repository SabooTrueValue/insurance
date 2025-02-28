import { AppSidebar } from "@/components/app-sidebar";
import { ThemeSwitcher } from "@/components/theme-switcher";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { auth } from "@/lib/auth";
import { NOT_LOGGED_IN } from "@/routes";
import { SessionProvider } from "next-auth/react";
import { redirect } from "next/navigation";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();

  if (!session) {
    redirect(NOT_LOGGED_IN);
  }

  return (
    <SessionProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="px-5 flex justify-between border-b h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <SidebarTrigger />
            <ThemeSwitcher />
          </header>
          <div className="m-5">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </SessionProvider>
  );
};

export default DashboardLayout;
