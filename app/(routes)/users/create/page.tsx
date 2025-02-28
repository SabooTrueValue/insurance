import { UserForm } from "@/app/_components/forms/user-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
const CreateUser = () => {
  return (
    <Card className="max-w-screen-xl">
      <CardHeader>
        <CardTitle>Create User</CardTitle>
        <CardDescription>
          Allows you to create an insurance agent and admin.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <UserForm />
      </CardContent>
    </Card>
  );
};

export default CreateUser;
