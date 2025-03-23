import { getAssignments } from "@/actions/assignment-action";
import { DataTable } from "@/app/_components/data-table";
import { AssignmentData, columns } from "./columns";

const Records = async () => {
  let data: AssignmentData[] = [];
  const res = await getAssignments();

  if (res.status === 200) {
    data = res.data;
  }

  if (res.status !== 200) {
    return (
      <div className="flex min-h-[500px] justify-center items-center text-center">
        <div>
          <h1 className="text-4xl font-semibold text-red-500">{res.status}!</h1>
          <p className="">{res.message}</p>
        </div>
      </div>
    );
  }
  return (
    <>
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
