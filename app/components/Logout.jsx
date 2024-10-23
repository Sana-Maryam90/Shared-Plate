import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { TbLogout } from "react-icons/tb";
import axios from "axios";

const Logout = ({linkClass, flexClass, iconClass}) => {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const router = useRouter();

  // Toggle the overlay visibility
  const handleLogoutClick = () => {
    setIsOverlayOpen(true); // Open the overlay when logout link is clicked
  };

  // Cancel logout and close the overlay
  const handleCancel = () => {
    setIsOverlayOpen(false); // Close the overlay
  };

  // Perform the logout operation
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await axios({
        url: "http://localhost:3000/api/logout", // API URL here
        method: "POST",
      });
      if (response.status === 200) {
        toast.success("Logout successful!");
        // Navigate to the home page
        setTimeout(() => {
          router.push("/");
        }, 1000);
      }
    } catch (error) {
      console.error("Request failed with status code", error.response.status);
      toast.error("Logout failed");
    }
  };

  return (
    <>
      <div className={linkClass} onClick={handleLogoutClick}>
        <li className={flexClass}>
          <TbLogout className={iconClass} />
          Logout
        </li>
      </div>

      {/* Overlay */}
      {isOverlayOpen && (
        <div className="fixed h-screen w-screen inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-skyblue text-deepBlue border border-deepBlue/35 m-6 p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">
              Are you sure you want to Logout?
            </h2>
            <div className="mt-8 flex justify-center space-x-6 lg:space-x-16">
              <button
                onClick={handleCancel}
                className="btn-primary"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="btn-primary bg-violet hover:bg-rose-950"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Logout;

