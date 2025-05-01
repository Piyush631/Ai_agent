import { IoArrowBack } from "react-icons/io5";
import Heading from "../component/Heading";
import { FaCode } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa";
import { IoMdWallet } from "react-icons/io";
import { PiBrain } from "react-icons/pi";

const data = [
  {
    name: "Technical",
    icon: <FaCode />,
  },
  {
    name: "Behavioral",
    icon: <FaRegUser />,
  },
  {
    name: "Experience",
    icon: <IoMdWallet />,
  },
  {
    name: "Leadership",
    icon: <PiBrain />,
  },
  {
    name: "Problem Solving",
    icon: <PiBrain />,
  },
];
export default function createInterview() {
  return (
    <div className="">
      <Heading />
      <div className=" h-full mx-auto lg:max-w-1/2 w-full ">
        <div className="flex  my-3 items-center font-semibold gap-4">
          <div className="text-2xl">
            <IoArrowBack />
          </div>
          <div className="text-lg md:text-xl lg:text-2xl">
            Create New Interview
          </div>
        </div>
        <div className="bg-white rounded-md">
          <div className="px-4 pb-1 pt-4 flex flex-col gap-2">
            <div className="text-semibold">Job Position</div>
            <div className="">
              <input
                type="text"
                className=" w-full  py-1.5  focus:outline-none  rounded-md border-1 border-gray-400 "
                placeholder="e.g Full Stack Developer"
              />
            </div>
          </div>
          <div className="px-4 py-1 flex flex-col gap-2">
            <div className="text-semibold">Job Description</div>
            <div className="">
              <textarea
                className=" w-full  py-1.5  focus:outline-none  rounded-md border-1 border-gray-400 "
                placeholder="Enter details job description"
              />
            </div>
          </div>
          <div className="px-4 py-1 flex flex-col gap-2">
            <div className="text-semibold">Interview Duration</div>
            <div className="">
              <select className="w-full py-2 focus:outline-none rounded-md text-gray-500 border-1 border-gray-400 ">
                <option className="text-gray-200" value="">
                  Select duration
                </option>
                <option>15 minutes</option>
                <option>30 minutes</option>
                <option>45 minutes</option>
              </select>
            </div>
          </div>
          <div className="px-4 pb-1 pt-4 flex flex-col gap-2">
            <div className="text-semibold">Interview Type</div>
            <div className="flex flex-wrap gap-3 ">
              {data.map((d) => (
                <button className="flex gap-1.5  px-5 cursor-pointer  text-sm justify-center items-center border-1 border-gray-400 rounded-xl  py-1">
                  <div>{d.icon}</div>
                  <div>{d.name}s</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
