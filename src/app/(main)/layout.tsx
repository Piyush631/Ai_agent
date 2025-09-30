"use client";
import { useSession } from "next-auth/react";
import Dashboardprovider from "./provider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function DashboardLayout({ children }: any) {
  return (
    <div>
      <Dashboardprovider>{children}</Dashboardprovider>
    </div>
  );
}
export default DashboardLayout;
