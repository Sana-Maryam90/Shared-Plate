"use client"
import React,{useState,useEffect} from 'react'
import { IoPerson } from "react-icons/io5";
import { useUser } from "../hooks/UserContext";
import { FaLocationDot } from "react-icons/fa6";
import { GrOrganization } from "react-icons/gr";
import { FaPhoneSquare } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { IoIosTime } from "react-icons/io";
import { FaLandmark } from "react-icons/fa";
import { GiveCard } from './PersonalCard';
import axios from 'axios'
import CompleteRequest from './CompleteRequest';


const OngoingRequestCard = ({ongoingRequests}) => {
  return (
    <div className="w-full flex">
      {ongoingRequests && ongoingRequests.length > 0 ? (
        ongoingRequests.map((data, index) => (
          <div className="flex flex-col w-full bg-green/10 border border-black/25 rounded-sm p-2 lg:w-3/5 md:w-3/4">
            <div className="flex w-full gap-8">
              <GiveCard
                label="Giver Name"
                icon={<IoPerson />}
                data={data.name}
              />
              <GiveCard
                label="Giving Organization"
                icon={<GrOrganization />}
                data={data.givingOrg}
              />
            </div>
            <div className="flex w-full gap-8">
              <GiveCard
                label="Contact"
                icon={<FaPhoneSquare />}
                data={data.contact}
              />
              <GiveCard
                label="Servings"
                icon={<FaPeopleGroup />}
                data={data.foodServing}
              />
            </div>
            <div className="flex w-full gap-8">
              <GiveCard
                label="Availability"
                icon={<IoIosTime />}
                data={data.availability}
              />
              <GiveCard
                label="Landmark"
                icon={<FaLandmark />}
                data={data.landmark}
              />
            </div>
            <div className="flex w-full gap-4 lg:gap-6">
              <h1 className="font-notosans font-semibold text-lg lg:text-xl">
                Location:
              </h1>
              <a
                href={`https://www.google.com/maps?q=${data.location.latitude},${data.location.longitude}`}
                className="font-notosans text-lg lg:text-xl text-blue-700 underline"
              >
                View Location on Map
              </a>
            </div>
            <div className="flex justify-center items-center">
              <CompleteRequest requestId={data.id}/>
            </div>
          </div>
        ))
      ) : (
        <h1 className="font-notosans font-semibold text-lg lg:text-xl">
          You do not have any requests under process
        </h1>
      )}{" "}
    </div>

    //  <div className='w-[95%] md:w-[80%] lg:w-[40%]'>
    //    <div className="w-[100%] md:w-[100%]  my-5 md:my-10 ">
    //      <div className="w-max flex flex-col justify-center mt-4 lg:mt-0 bg-green/10 border border-black/25">
    //        <div className="w-[100%] mt-3 flex  lg:mt-5 lg:flex lg:items-center lg:gap-1">
    //        {personalData && (
    //          <>
    //            <GiveCard
    //              label="Giver Name"
    //              icon={<IoPerson/>}
    //              data={personalData.name}
    //            />
    //            <GiveCard
    //              label="Servings"
    //              icon={<FaPeopleGroup />}
    //              data={personalData.name}
    //            />

    //            <GiveCard
    //              label="Giving Organization"
    //              icon={<GrOrganization/>}
    //              data={personalData.name}
    //            />
    //          </>
    //        )}
    //        </div>
    //        <div className="w-[100%] mt-3 flex  lg:mt-5 lg:flex lg:items-center lg:gap-1">
    //        {personalData && (
    //        <>
    //          <GiveCard
    //             label="Taker Name"
    //             icon={<IoPerson/>}
    //             data={personalData.email}
    //           />

    //           <GiveCard
    //             label="Contact Number"
    //             icon={<FaPhoneSquare />}
    //             data={personalData.email}
    //           />

    //           <GiveCard
    //             label="Location"
    //             icon={<FaLocationDot />}
    //             data={personalData.email}
    //           />
    //        </>
    //        )}
    //       </div>
    //       <div className='flex justify-center items-center'>
    //       <CompleteRequest/>
    //       </div>
    //      </div>
    //    </div>
    //  </div>
  );
};

export default OngoingRequestCard
