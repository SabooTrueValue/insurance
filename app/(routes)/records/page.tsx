"use client";

import { getAssignments } from "@/actions/assignment-action";
import { DataTable } from "@/app/_components/data-table";
import { endOfMonth, startOfMonth } from "date-fns";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { AssignmentData, columns } from "./columns";
import { DatePickerWithRange } from "@/components/range-picker";
import { Loader } from "lucide-react";

const Records = () => {
  const [data, setData] = useState<AssignmentData[] | []>([]);
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error message state

  const today = new Date(); // Current date
  const startOfCurrentMonth = startOfMonth(today); // Start of the current month
  const endOfCurrentMonth = endOfMonth(today); // End of the current month

  const [date, setDate] = useState<DateRange | undefined>({
    from: startOfCurrentMonth,
    to: endOfCurrentMonth,
  });

  useEffect(() => {
    const fetchData = async () => {
      // Ensure `date.from` and `date.to` are valid Date objects
      if (!date?.from || !date?.to) {
        setError("Invalid date range.");
        setLoading(false);
        return;
      }

      try {
        const res = await getAssignments(date.from, date.to);

        if (res.status !== 200) {
          setError(res.message);
          setLoading(false);
          return;
        }

        setData(res.data);
      } catch (err) {
        console.log(err);
        setError("Failed to fetch assignments.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [date]); // Re-run fetchData whenever `date` changes

  // Show loading indicator while data is being fetched
  if (loading) {
    return (
      <div className="min-h-[calc(100vh-20vh)] max-w-[calc(100vw-20vw)] flex items-center justify-center">
        <Loader className="animate-spin" />
      </div>
    );
  }

  // Show an error message if there was an error fetching the data
  if (error) {
    return (
      <div className="flex min-h-[500px] justify-center items-center text-center">
        <div>
          <h1 className="text-4xl font-semibold text-red-500">{error}</h1>
        </div>
      </div>
    );
  }

  return (
    <>
      <DatePickerWithRange date={date} setDate={setDate} />
      <DataTable
        filterKey="driver.user.name"
        filterTitle="agent name"
        disabled={false}
        columns={columns}
        data={data}
        isExportEnabled={true}
      />
    </>
  );
};

export default Records;
