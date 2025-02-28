import { Spinner } from "@/components/spinner";

const Loading = () => {
  return (
    <div className="flex min-h-[calc(100vh-60px)] items-center justify-center">
      <Spinner />
    </div>
  );
};

export default Loading;
