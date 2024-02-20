"use client";
import React, { useEffect } from "react";
import { useUser } from '../hooks/UserContext';
import Link from "next/link";
import axios from "axios";

export default function UserType() {
  const { user, setUser } = useUser();

  // Get the current user data from the backend API
  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const response = await axios({
          url: "http://localhost:3000/api/currentUser",
          method: "GET",
        });
        console.log("Successfully get user: ", response.data);
        setUser(response.data);
      } catch (error) {
        if (error.response.status === 401) {
          setUser(error.response.data);
          console.log("401 Response: ", error.response.data)
        }
        else console.error("Error fetching current user:", error.response.data);
      }
    };

    getCurrentUser();
  }, []);
  console.log("User Hook Data: ", user);

  return (
    <>
      {user.isAuthenticated ? (
        <>
          <div className="fixed z-50 top-5 xl:top-8 right-5 xl:right-9 w-full flex flex-row justify-end items-center gap-5">
            <h4 className="hidden font-notoSans text-lg md:block xl:text-xl">
              Hi! {user.name}
            </h4>
            <Link href={"/"}>
              <button className="text-white bg-black rounded-full font-notoSans text-base  md:text-xl xl:text-2xl h-7 w-7 md:h-8 md:w-8 md:mr-4 xl:h-10 xl:w-10 xl:mr-9 transition-colors hover:bg-green duration-200">
                {user.name.charAt(0)}
              </button>
            </Link>
          </div>
          <div className="flex flex-row justify-center mt-2 gap-8 mx-4 xl:mt-4 xl:ml-9 xl:gap-16">
            <Link href={"/give"}>
              <button className="btn-primary">Give</button>
            </Link>
            <Link href={"/take"}>
              <button className="btn-primary">Deliver</button>
            </Link>
          </div>
        </>
      ) : (
        <div className="flex flex-row justify-center mt-2 gap-8 mx-4 xl:mt-4 xl:ml-9 xl:gap-16">
          <Link href={"/login"}>
            <button className="btn-primary">Give</button>
          </Link>
          <Link href={"/login"}>
            <button className="btn-primary">Deliver</button>
          </Link>
        </div>
      )}
    </>
  );
}
