import { Sidenav } from "@/components/sidenav/sidenav";
import { Outlet } from "react-router";

const DashboardLayout = () => {
  return (
    <div className="w-full h-screen flex flex-col md:flex-row">
      <Sidenav />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
