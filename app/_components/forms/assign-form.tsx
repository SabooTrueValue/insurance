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

import { createAssignment } from "@/actions/assignment-action";
import { assignmentSchema } from "@/schema/assignment-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Status } from "@prisma/client";

import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { useGeolocation } from "@/hooks/use-geo-location";
import { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const AssignForm = ({
  driverId,
  count,
}: {
  driverId: string;
  count: number;
}) => {
  const { address } = useGeolocation();

  const form = useForm<z.infer<typeof assignmentSchema>>({
    resolver: zodResolver(assignmentSchema),
    defaultValues: {
      driverId: driverId,
      customerName: "",
      customerPhone: "",
      startAddress: "",
      startTime: new Date().toISOString(),
      amount: "0",
      visitReason: "",
      status: Status.ASSIGNED,
      count: count + 1,
    },
  });

  useEffect(() => {
    if (address) {
      form.setValue("startAddress", address);
    }
  }, [address, form]);

  const { isSubmitting, errors } = form.formState;
  console.log(errors);

  const submit = async (values: z.infer<typeof assignmentSchema>) => {
    try {
      const res = await createAssignment(values);

      if (res?.status === 200) {
        toast.success("success");
        form.reset();
      } else {
        toast.error(res?.message || "Failed to create!");
      }
    } catch (error) {
      console.error("Error in onSubmit:", error);
      toast.error("Something went wrong while submitting .");
    }
  };

  if (!driverId) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submit)} className="space-y-4">
          <FormField
            control={form.control}
            name="customerName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Customer Name</FormLabel>
                <FormControl>
                  <Input placeholder="Rahul" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="customerPhone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Customer Phone</FormLabel>
                <FormControl>
                  <Input placeholder="9848898488" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="visitReason"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reason for visit</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Reason" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Cash/Cheque Collection">
                        Cash/Cheque Collection
                      </SelectItem>
                      <SelectItem value="Documents Submit Collection">
                        Documents Submit Collection
                      </SelectItem>
                      <SelectItem value="Casual Meet">Casual Meet</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center justify-center mx-auto max-w-xs w-full"
          >
            {isSubmitting ? "Starting..." : "Start"}
          </Button>
        </form>
      </Form>
    </>
  );
};
