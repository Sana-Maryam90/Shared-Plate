import Link from "next/link";
import React, { useState } from "react";
import { FaBoxOpen } from "react-icons/fa";
import { BsBarChartLineFill } from "react-icons/bs";
import { MdOutlineDirectionsBike } from "react-icons/md";
import { FaPeopleCarryBox } from "react-icons/fa6";
import Logout from "@/app/components/Logout";

const Sidebar = ({ isOpen, setIsOpen }) => {

  const closeSidebar = () => {
    setIsOpen(false);
  };

  const toggleDropdown = (setter) => {
    setter((prevState) => !prevState);
  };

  const linkClass = "w-full cursor-pointer";
  const flexClass =
    "flex items-center px-4 py-6 rounded-lg transition-colors from-deepBlue/80 to-violet hover:bg-gradient-to-br";
  const iconClass = "w-5 text-lg inline-block mr-4";

  return (
    <div
      className={`bg-deepBlue text-skyblue text-lg h-full w-3/4 sm:w-2/4 md:w-1/3 pb-4 px-2 lg:pb-6 fixed top-[4.5rem] left-0 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out lg:w-64 lg:transform-none lg:top-0 z-50`}
    >
      <div className="w-full flex items-center px-4 mt-4 mb-6">
        <h2 className="text-3xl font-bold">Shared Plate</h2>
      </div>
      <ul>
        <Link
          href="/account/dashboard"
          className={linkClass}
          onClick={closeSidebar}
        >
          <li className={flexClass}>
            <BsBarChartLineFill className={iconClass} /> Dashboard
          </li>
        </Link>

        <Link
          href="/account/openrequests"
          className={linkClass}
          onClick={closeSidebar}
        >
          <li className={flexClass}>
            <FaBoxOpen className={iconClass} /> Open Requests
          </li>
        </Link>

        <Link
          href="/account/ongoingrequests"
          className={linkClass}
          onClick={closeSidebar}
        >
          <li className={flexClass}>
            <MdOutlineDirectionsBike className={iconClass} /> Ongoing Requests
          </li>
        </Link>

        <Link
          href="/account/closedrequests"
          className={linkClass}
          onClick={closeSidebar}
        >
          <li className={flexClass}>
            <FaPeopleCarryBox className={iconClass} /> Closed Requests
          </li>
        </Link>
        <Logout linkClass={linkClass} flexClass={flexClass} iconClass={iconClass}/>
      </ul>
    </div>
  );
};

export default Sidebar;
