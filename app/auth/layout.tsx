import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { LOGGED_IN } from "@/routes";
import Image from "next/image";
import { redirect } from "next/navigation";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();

  if (session) {
    redirect(LOGGED_IN);
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">
              <Image
                src="/logo.png"
                alt="Logo"
                className="mx-auto"
                width={150}
                height={150}
              />
            </CardTitle>
            <CardDescription>
              Welcome back! Please sign in to continue
            </CardDescription>
          </CardHeader>
          <CardContent>{children}</CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuthLayout;
