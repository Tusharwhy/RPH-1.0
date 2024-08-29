import React, { useContext } from "react";
import { ImSwitch } from "react-icons/im";

import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Auth/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  return (
    <nav className="inset-x-0 fixed bg-white  z-10 shadow-md">
      <div className=" py-6 flex items-center justify-between w-[90%] mx-auto ">
        {/* Logo on the left */}
        <div className="pl-8">
          <img className="w-20" alt="" />
          <h1 className="text-black font-bold text-2xl">LEGAL ANGEL</h1>
        </div>

        {/* Navigation links on the right */}
        <div className=" pr-10 text-lg font-medium">
          <ul className="flex space-x-8 text-black">
            <li>
              <Link to="/dashboard" className="hover:text-slate-500">
                Home
              </Link>
            </li>
            {/* <li>
              <Link to="/user" className="hover:text-slate-500">
                Services
              </Link>
            </li>
            <li>
              <Link to="/client" className="hover:text-slate-500">
                About Us
              </Link>
            </li> */}
            {/* <li>
              <Link to="/pipeline" className="hover:text-slate-500">
                Functions
              </Link>
            </li> */}
            <li>
              <ImSwitch
                className="mt-1 hover:text-slate-500 cursor-pointer"
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
              />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
