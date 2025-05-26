"use client";
import { FaMicrophone } from "react-icons/fa6";
import { IoCall } from "react-icons/io5";
import { FaRegClock } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/appStore";

export default function StartInterview() {
  const job = useSelector((state: RootState) => state.question);
  console.log(job);
  return (
    <div className="h-screen w-full bg-black text-white">
      <div className="w-full md:w-2/3 mx-auto px-8 pt-24 ">
        <div className="flex justify-between text-sm md:text-lg">
          <div>AI Interview Session</div>
          <div className="flex items-center justify-center gap-1">
            <div className="text-white">
              <FaRegClock />
            </div>
            <div>00:05:23 {job.jobdescription}</div>
          </div>
        </div>
        <div className="flex justify-between gap-4 mt-4">
          <div className=" h-56 md:h-72 w-full md:w-1/2 border-1 border-white/60  rounded-md">
            <div className=" flex h-full flex-col justify-center gap-2 items-center">
              <img
                src="/ai.jpeg"
                className=" h-16 w-16 rounded-full object-cover"
                alt="Success"
              />
              <div>Ai Recuriter</div>
            </div>
          </div>
          <div className=" h-56 md:h-72 w-full md:w-1/2 border-1 border-white/60  rounded-md">
            <div className=" flex h-full flex-col justify-center gap-2 items-center">
              <div className="h-16 w-16  flex items-center justify-center rounded-full bg-blue-500">
                <div>P</div>
              </div>
              <div>You </div>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center my-6 items-center gap-6">
          <div className="h-10 w-10 bg-gray-600 flex items-center justify-center rounded-full">
            <div className="text-white text-xl">
              <FaMicrophone />{" "}
            </div>
          </div>
          <div className="h-10 w-10 bg-red-600 flex items-center justify-center rounded-full">
            <div className="text-white text-xl">
              <IoCall />
            </div>
          </div>
        </div>
        <div className="text-center">Interview in Progress</div>
      </div>
    </div>
  );
}
