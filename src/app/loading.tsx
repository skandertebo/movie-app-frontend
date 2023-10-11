import { AiOutlineLoading } from "react-icons/ai";

export default function LoadingHomePage() {
  return (
    <div className="h-main w-screen flex justify-center items-center">
      <AiOutlineLoading className="animate-spin text-6xl text-center mx-auto my-auto text-blue-gray-300" />
    </div>
  );
}
