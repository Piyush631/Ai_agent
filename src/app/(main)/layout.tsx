"use client";
import { useSession } from "next-auth/react";
import Dashboardprovider from "./provider";
import { useRouter } from "next/navigation";

function DashboardLayout({ children }: any) {
  const session = useSession();
  const router = useRouter();
  if (session.status === "unauthenticated") {
    router.push("/");
  }
  return (
    <div>
      <Dashboardprovider>{children}</Dashboardprovider>
    </div>
  );
}
export default DashboardLayout;
