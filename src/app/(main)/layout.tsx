"use client";
import { useSession } from "next-auth/react";
import Dashboardprovider from "./provider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Heading from "./component/Heading";
function DashboardLayout({ children }: any) {
  return (
    <div>
      <Dashboardprovider>
        <Heading />
        {children}</Dashboardprovider>
    </div>
  );
}
export default DashboardLayout;
