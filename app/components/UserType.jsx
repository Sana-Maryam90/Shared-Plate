"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getCurrentUser } from "./GetUser";

export default function UserType() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const userDetails = await getCurrentUser();
      setUser(userDetails);
    };

    fetchUser();
  }, []);

  return (
    <>
      {user.isAuthenticated ? (
        <>
          <div className="fixed z-50 top-5 xl:top-8 right-5 xl:right-9 w-full flex flex-row justify-end items-center gap-5">
            <h4 className="hidden font-notoSans text-lg md:block xl:text-xl">
              Hi! {user.name}
            </h4>
            <Link href={"/account/dashboard"}>
              <button className="text-bgwhite bg-deepBlue rounded-full font-notoSans text-base  md:text-xl xl:text-2xl h-7 w-7 md:h-8 md:w-8 md:mr-4 xl:h-10 xl:w-10 xl:mr-9 transition-colors from-deepBlue/80 to-violet hover:bg-gradient-to-br duration-200">
                {user.name.charAt(0)}
              </button>
            </Link>
          </div>
          <div className="flex flex-row justify-center mt-2 gap-8 mx-4 xl:mt-4 xl:ml-9 xl:gap-16">
            <Link href={"/give"}>
              <button className="btn-primary">Give</button>
            </Link>
            <Link href={"/take"}>
              <button className="btn-primary">Take</button>
            </Link>
          </div>
        </>
      ) : (
        <div className="flex flex-row justify-center mt-2 gap-8 mx-4 xl:mt-4 xl:ml-9 xl:gap-16">
          <Link href={"/login"}>
            <button className="btn-primary">Give</button>
          </Link>
          <Link href={"/login"}>
            <button className="btn-primary">Take</button>
          </Link>
        </div>
      )}
    </>
  );
}
