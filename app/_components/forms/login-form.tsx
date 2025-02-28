"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { loginSchema } from "@/schema/login-schema";
import { loginUser } from "@/actions/login-action";
import toast from "react-hot-toast";
import { Spinner } from "@/components/spinner";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

export const LoginForm = () => {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phone: "",
      password: "",
    },
  });

  const { isSubmitting } = form.formState;
  const router = useRouter();

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    try {
      const res = await loginUser(values);
      if (res && res.status !== 200) {
        toast.error(res.message);
      } else {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input
                  disabled={isSubmitting}
                  placeholder="97654*****"
                  className="focus-visible:ring-0 focus:outline-none"
                  autoFocus
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <div className="flex items-center justify-between">
                <FormLabel>Password</FormLabel>
                <Button
                  asChild
                  variant={"link"}
                  className="text-muted-foreground text-xs sm:text-sm"
                >
                  <Link href="/auth/forgot-password">
                    Forgot your password?
                  </Link>
                </Button>
              </div>
              <FormControl>
                <div className="flex items-center">
                  <Input
                    disabled={isSubmitting}
                    placeholder="******"
                    className="border-r-0 focus-visible:ring-0 rounded-r-none"
                    type={passwordVisible ? "text" : "password"}
                    {...field}
                  />
                  <button
                    type="button"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                    className=" border-y border-r rounded-r-md px-2 h-9"
                  >
                    {passwordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting} className="flex w-full">
          {isSubmitting ? <Spinner /> : "Login"}
        </Button>

        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account? <br />
          <a href="#" className="underline underline-offset-4">
            Kindly reach out your head.
          </a>
        </div>
      </form>
    </Form>
  );
};
