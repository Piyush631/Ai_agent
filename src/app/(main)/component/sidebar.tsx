"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { TfiMenuAlt } from "react-icons/tfi";
import { RiBillLine } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";
import { FaPlus, FaBars } from "react-icons/fa6";
import { RiMenuFold3Fill } from "react-icons/ri";
import { RiMenuFold4Fill } from "react-icons/ri";

import { useState } from "react";

const data = [
  {
    name: "Dashboard",
    link: "/dashboard",
    icon: <MdOutlineDashboardCustomize />,
  },
  {
    name: "Scheduled interview",
    link: "/home",
    icon: <RiCalendarScheduleLine />,
  },
  {
    name: "All interview",
    link: "/interview",
    icon: <TfiMenuAlt />,
  },
  {
    name: "Billing",
    link: "/interview",
    icon: <RiBillLine />,
  },
  {
    name: "Setting",
    link: "/interview",
    icon: <IoSettingsOutline />,
  },
];

function Sidebar({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
}) {
  const router = useRouter();
  const [type, setType] = useState("Dashboard");

  return (
    <div
      className={`
        h-full pt-4 bg-gray-100 transition-all duration-300 fixed md:static z-40
        ${open ? "w-60" : "w-16"}
        ${open ? "left-0" : "-left-60"}
        md:left-0
        top-0
        md:h-auto
        min-h-screen
      `}
      style={{ minHeight: "100vh" }}
    >
      <div className="flex items-center justify-end gap-8 px-2 text-2xl">
        <span className={`text-2xl text-center ${!open && "hidden"}`}>
          {" "}
          AiCruiter
        </span>
        <div className="flex justify-end">
          <button
            onClick={() => setOpen(!open)}
            className="p-2 focus:outline-none"
          >
            {open ? <RiMenuFold3Fill /> : <RiMenuFold4Fill />}
          </button>
        </div>
      </div>
      <div className="w-full mt-4 px-1">
        <button
          onClick={() => {
            router.push("/createinterview");
          }}
          className={`bg-blue-600 flex items-center gap-2 w-full rounded-lg px-2 h-8 text-white ${
            !open && "justify-center"
          }`}
        >
          <div>
            <FaPlus />
          </div>
          {open && <div> create new Interview </div>}
        </button>
      </div>
      <div className="pt-5 flex flex-col gap-4">
        {data.map((d, index) => (
          <div
            key={d.name}
            onClick={() => setType(d.name)}
            className={`pl-5 font-[400] bg-none text-lg hover:bg-gray-300 rounded-lg py-1.5 ${
              type === d.name ? "bg-gray-300" : ""
            }`}
          >
            <span onClick={() => router.push(d.link)}>
              <div className="flex items-center gap-2">
                <div>{d.icon}</div>
                {open && <div>{d.name}</div>}
              </div>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Sidebar;
