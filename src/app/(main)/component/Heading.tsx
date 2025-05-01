import { FaBell } from "react-icons/fa";

export default function Heading() {
  return (
    <div className="h-20 rounded-xl w-full items-center px-3 bg-white flex justify-between">
      <div className="">
        <div className="text-lg font-semibold ">Welcome back piyush</div>
        <div className="text-md text-gray-400">
          AI driven Interviews Hassle free hirings
        </div>
      </div>
      <div className="flex items-center gap-3 ">
        <div className="text-gray-600 text-xl">
          <FaBell />
        </div>
        <div className="h-8 w-8 text-center flex text-sm items-center justify-center rounded-full bg-fuchsia-200">
          <div>A</div>
        </div>
      </div>
    </div>
  );
}
