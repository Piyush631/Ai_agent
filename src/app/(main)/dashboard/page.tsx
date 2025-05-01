"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Heading from "../component/Heading";
import { MdCall } from "react-icons/md";

import { MdVideoCall } from "react-icons/md";

function Dashboard() {
  const router = useRouter();
  const session = useSession();
  console.log(session);
  if (session.status === "unauthenticated") {
    router.push("/");
  }
  return (
    <div className="bg-gray-200 h-screen w-full ">
      <Heading />
      <div className="my-4 text-2xl font-semibold ">Dashboard</div>
      <div className=" my-1  flex flex-col md:flex-row md:gap-3 gap-5 justify-center ">
        <div className=" p-3 px-5  h-40 w-full md:w-1/2 flex flex-col justify-around border-1 rounded-xl bg-white border-gray-300">
          <div className="text-2xl ">
            <div className="h-8 w-9 rounded-md flex justify-center items-center bg-gray-200 ">
              <div>
                <MdVideoCall />
              </div>
            </div>
          </div>
          <div className="text-xl">create new interview</div>
          <div className="text-md ">
            create AI interview and Scheduled them with candidate
          </div>
        </div>
        <div className=" p-3 px-5 h-40 w-full md:w-1/2 flex flex-col justify-around border-1 rounded-xl bg-white border-gray-300">
          <div className="h-8 w-9 rounded-md flex justify-center items-center bg-gray-200 ">
            <div>
              <MdCall />
            </div>
          </div>
          <div className="text-xl ">Create Phone Screening Call</div>
          <div className="text-md ">
            Scheduled phone screening calls with potential candidates
          </div>
        </div>
      </div>
      <div className="mt-3 ">
        <div>Previously Created Interview</div>
      </div>
    </div>
  );
}
export default Dashboard;
