import Link from "next/link";
import React, { useState } from "react";
import { TbCategoryFilled, TbLogout } from "react-icons/tb";
import { FaBox, FaUsers } from "react-icons/fa6";
import { BsBarChartLineFill, BsCartCheckFill } from "react-icons/bs";
import { RiAdminFill } from "react-icons/ri";
import { IoIosArrowDown } from "react-icons/io";
import Logout from "@/app/components/Logout";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);

  const closeSidebar = () => {
    setIsOpen(false);
  };

  const toggleDropdown = (setter) => {
    setter((prevState) => !prevState);
  };

  const linkClass = "w-full cursor-pointer";
  const flexClass =
    "flex items-center px-4 py-6 rounded-lg transition-colors hover:bg-cherryBlossomPink";
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
          href="/adminDashboard"
          className={linkClass}
          onClick={closeSidebar}
        >
          <li className={flexClass}>
            <BsBarChartLineFill className={iconClass} /> Dashboard
          </li>
        </Link>

        <li
          className="w-full cursor-pointer px-4 py-6  rounded-lg transition-colors hover:bg-cherryBlossomPink"
          onClick={() => toggleDropdown(setCategoriesOpen)}
        >
          <div className="flex items-center">
            <TbCategoryFilled className={iconClass} /> Created Requests
            <IoIosArrowDown
              className={`text-xl pt-1 ml-auto transition-transform duration-300 ${
                categoriesOpen ? "rotate-180" : "rotate-0"
              }`}
            />
          </div>
          <ul
            className={`ml-9 text-base flex flex-col gap-4 transition-all duration-300 overflow-hidden ${
              categoriesOpen
                ? "mt-3 mb-1 max-h-40 opacity-100"
                : "my-0 max-h-0 opacity-0"
            }`}
          >
            <Link
              href="/adminDashboard/manageCategories"
              onClick={closeSidebar}
            >
              Give Requests
            </Link>
            <Link
              href="/adminDashboard/manageCategories"
              onClick={closeSidebar}
            >
              Take Requests
            </Link>
          </ul>
        </li>

        <li
          className="w-full cursor-pointer px-4 py-6 rounded-lg transition-colors hover:bg-cherryBlossomPink"
          onClick={() => toggleDropdown(setProductsOpen)}
        >
          <div className="flex items-center">
            <FaBox className={iconClass} /> Ongoing Requests
            <IoIosArrowDown
              className={`text-xl pt-1 ml-auto transition-transform duration-300 ${
                productsOpen ? "rotate-180" : "rotate-0"
              }`}
            />
          </div>
          <ul
            className={`ml-9 text-base flex flex-col gap-4 transition-all duration-300 overflow-hidden ${
              productsOpen
                ? "mt-3 mb-1 max-h-40 opacity-100"
                : "my-0 max-h-0 opacity-0"
            }`}
          >
            <Link href="/adminDashboard/addProduct" onClick={closeSidebar}>
              Give Requests
            </Link>
            <Link href="/adminDashboard/manageProducts" onClick={closeSidebar}>
              Take Requests
            </Link>
          </ul>
        </li>

        <Link
          href="/adminDashboard/users"
          className={linkClass}
          onClick={closeSidebar}
        >
          <li className={flexClass}>
            <FaUsers className={iconClass} /> History
          </li>
        </Link>

        <button className={linkClass} onClick={closeSidebar}>
          <li className={flexClass}>
            <TbLogout className={iconClass} />
            <Logout />
          </li>
        </button>
      </ul>
    </div>
  );
};

export default Sidebar;
