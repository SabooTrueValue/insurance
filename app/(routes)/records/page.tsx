import { getAssignments } from "@/actions/assignment-action";
import { DataTable } from "@/app/_components/data-table";
import { AssignmentData, columns } from "./columns";

const Records = async () => {
  let data: AssignmentData[] = [];
  const res = await getAssignments();

  if (res.status === 200) {
    data = res.data;
  }
  console.log(data);

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
        filterKey="customerName"
        filterTitle="customer name"
        disabled={false}
        columns={columns}
        data={data}
        isExportEnabled={true}
        // initialColumnVisibility={{
        //   collectedAddress: false,
        //   startAddress: false,
        // }}
      />
      {/* <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <GridView />
      </div> */}
    </>
  );
};

export default Records;
