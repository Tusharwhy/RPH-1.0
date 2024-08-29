import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export function Layout() {
  return (
    <>
      <Navbar />
      <div className="pt-[80px]">
        <Outlet />
      </div>
    </>
  );
}
