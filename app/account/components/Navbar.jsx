import Link from "next/link";
import React, { useState } from "react";
import { FaBarsStaggered } from "react-icons/fa6";
import { BiSearchAlt, BiSolidBell, BiHome } from "react-icons/bi";
import { BsPersonCircle } from "react-icons/bs";
import { useRequests } from "@/app/hooks/RequestsContext";

const Navbar = ({ toggleSidebar }) => {
  const { user } = useRequests();
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const toggleSearchBar = () => {
    setShowMobileSearch(!showMobileSearch);
  };


  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleHover = (isHovering) => {
    setIsOpen(isHovering);
  };

  return (
    <div className="relative z-30">
      <nav className="fixed bg-skyblue shadow-md w-full h-[4.5rem] flex items-center justify-between px-4 md:px-6 xl:px-8 z-30">
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="block lg:hidden text-deepBlue focus:outline-none"
          >
            <FaBarsStaggered size={24} />
          </button>
          <span className="text-base md:text-xl font-semibold ml-4 md:ml-6 lg:ml-64">
            Hi! {user.name ? user.name.split(" ").slice(0, 1).join(" ") : "User"}
          </span>
        </div>

        <div className="flex items-center">
          <div className="hidden md:flex items-center w-56 xl:w-96 bg-bgwhite border border-deepBlue/35 rounded-md px-4 py-2 xl:mx-6">
            <BiSearchAlt className="text-deepBlue mr-2 text-2xl" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-transparent text-sm text-outerSpace focus:outline-none"
            />
          </div>

          <div className="ml-4 flex items-end gap-4 md:gap-6 xl:gap-10">
            <button
              onClick={toggleSearchBar}
              className="block md:hidden text-deepBlue focus:outline-none"
            >
              <BiSearchAlt className="text-[24px] md:text-2xl" />
            </button>

            <button className="text-deepBlue focus:outline-none">
              <BiSolidBell className="text-[24px] md:text-3xl hover:text-violet" />
            </button>

            <Link href="/" className="text-deepBlue focus:outline-none">
              <BiHome className="text-[24px] md:text-3xl hover:text-violet" />
            </Link>

            <div className="relative inline-block">
              {/* Profile Icon */}
              <div className="text-deepBlue focus:outline-none">
                <BsPersonCircle
                  className="text-[24px] md:text-3xl cursor-pointer hover:text-violet"
                  onClick={handleToggle}
                  onMouseEnter={() => handleHover(true)}
                  onMouseLeave={() => handleHover(false)}
                />
              </div>

              {/* Profile Info Box */}
              {isOpen && (
                <div
                  onMouseEnter={() => handleHover(true)}
                  onMouseLeave={() => handleHover(false)}
                  className="absolute right-0 mt-4 w-auto bg-bgwhite border border-deepBlue/35 shadow-lg rounded-lg p-4"
                >
                  <p className="text-lg font-semibold">{user && user.name}</p>{" "}
                  {/* Username */}
                  <p className="text-base text-gray-500 ">
                    {user && user.email}
                  </p>{" "}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div
        className={`fixed top-0 left-0 w-full bg-bgwhite p-4 transform transition-transform duration-300 ease-in-out ${
          showMobileSearch ? "translate-y-16" : "-translate-y-full"
        } md:hidden z-20`}
      >
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-4 py-2 text-outerSpace text-sm border border-deepBlue/35 rounded-md focus:outline-none"
        />
      </div>
    </div>
  );
};

export default Navbar;
