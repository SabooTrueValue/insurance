import { getUsers, UserData } from "@/actions/user-action";
import { DataTable } from "@/app/_components/data-table";
import { columns } from "./columns";

const Users = async () => {
  let data: UserData[] = [];
  const res = await getUsers();

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
    <DataTable
      filterKey="name"
      filterTitle="name"
      disabled={false}
      columns={columns}
      data={data}
      createUrl="/users/create"
    />
  );
};

export default Users;
