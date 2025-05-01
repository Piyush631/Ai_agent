import Sidebar from "./component/sidebar";
import { useState } from "react";

function Dashboardprovider({ children }: any) {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex min-h-screen">
      <Sidebar open={open} setOpen={setOpen} />

      <div className="pt-5 px-2 md:px-8 w-full bg-gray-200 transition-all duration-300 ml-0 md:ml-0">
        <div className="md:hidden flex items-center p-2">
          <button
            onClick={() => setOpen(!open)}
            className="p-2 focus:outline-none"
          >
            <svg width="24" height="24" fill="none">
              <path
                d="M6 12h12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
export default Dashboardprovider;
