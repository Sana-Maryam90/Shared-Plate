// "use client"
// import React,{useState,useEffect} from 'react'
// import { IoPerson } from "react-icons/io5";
// import { useUser } from "../hooks/UserContext";
// import { FaLocationDot } from "react-icons/fa6";
// import { GrOrganization } from "react-icons/gr";
// import { FaPhoneSquare } from "react-icons/fa";
// import { FaPeopleGroup } from "react-icons/fa6";
// import { IoIosTime } from "react-icons/io";
// import { FaLandmark } from "react-icons/fa";
// import { FaBowlFood } from "react-icons/fa6";
// import { GiveCard } from './PersonalCard';
// import axios from 'axios'
// import CompleteRequest from './CompleteRequest';

// const ongoingRequests= [{givername: "Ayesha Imam", foodtype:"Biryani", foodServing:"4", takername:"Fatima Sattar", contact:"1234567890"}];

// const OngoingRequestCard = () => {
//   return (
//     <div className="w-full flex">
//       {ongoingRequests && ongoingRequests.length > 0 ? (
//         ongoingRequests.map((data, index) => (
//           <div className="flex flex-col w-full bg-green/10 border border-black/25 rounded-sm p-2 lg:w-3/5 md:w-3/4">
//             <div className="flex w-full gap-8">
//               <GiveCard
//                 label="Giver Name"
//                 icon={<IoPerson />}
//                 data={data.givername}
//               />
//               <GiveCard
//                 label="Food Type"
//                 icon={<FaBowlFood />}
//                 data={data.foodtype}
//               />
//               <GiveCard
//                 label="Servings"
//                 icon={<FaPeopleGroup />}
//                 data={data.foodServing}
//               />
//             </div>
//             <div className="flex w-full gap-8">
//               <GiveCard
//                 label="Taker Name"
//                 icon={<IoPerson />}
//                 data={data.takername}
//               />
//               <GiveCard
//                 label="Contact"
//                 icon={<FaPhoneSquare />}
//                 data={data.contact}
//               />
//               <div className="flex w-full flex-col lg:gap-6">
//                 <h1 className="font-notosans font-semibold text-lg lg:text-xl">
//                   Location:
//                 </h1>
//                 <a
//                   href="/"
//                   className="font-notosans text-lg lg:text-xl text-blue-700 underline"
//                 >
//                   View Location on Map
//                 </a>
//               </div>
//             </div>

//             <div className="flex justify-center mt-6 items-center">
//               <CompleteRequest requestId={data.id} />
//             </div>
//           </div>
//         ))
//       ) : (
//         <h1 className="font-notosans font-semibold text-lg lg:text-xl">
//           You do not have any requests under process
//         </h1>
//       )}{" "}
//     </div>

//     //  <div className='w-[95%] md:w-[80%] lg:w-[40%]'>
//     //    <div className="w-[100%] md:w-[100%]  my-5 md:my-10 ">
//     //      <div className="w-max flex flex-col justify-center mt-4 lg:mt-0 bg-green/10 border border-black/25">
//     //        <div className="w-[100%] mt-3 flex  lg:mt-5 lg:flex lg:items-center lg:gap-1">
//     //        {personalData && (
//     //          <>
//     //            <GiveCard
//     //              label="Giver Name"
//     //              icon={<IoPerson/>}
//     //              data={personalData.name}
//     //            />
//     //            <GiveCard
//     //              label="Servings"
//     //              icon={<FaPeopleGroup />}
//     //              data={personalData.name}
//     //            />

//     //            <GiveCard
//     //              label="Giving Organization"
//     //              icon={<GrOrganization/>}
//     //              data={personalData.name}
//     //            />
//     //          </>
//     //        )}
//     //        </div>
//     //        <div className="w-[100%] mt-3 flex  lg:mt-5 lg:flex lg:items-center lg:gap-1">
//     //        {personalData && (
//     //        <>
//     //          <GiveCard
//     //             label="Taker Name"
//     //             icon={<IoPerson/>}
//     //             data={personalData.email}
//     //           />

//     //           <GiveCard
//     //             label="Contact Number"
//     //             icon={<FaPhoneSquare />}
//     //             data={personalData.email}
//     //           />

//     //           <GiveCard
//     //             label="Location"
//     //             icon={<FaLocationDot />}
//     //             data={personalData.email}
//     //           />
//     //        </>
//     //        )}
//     //       </div>
//     //       <div className='flex justify-center items-center'>
//     //       <CompleteRequest/>
//     //       </div>
//     //      </div>
//     //    </div>
//     //  </div>
//   );
// };

// export default OngoingRequestCard

"use client";
import React, { useState, useEffect } from "react";
import { IoPerson } from "react-icons/io5";
import { useUser } from "../hooks/UserContext";
import { FaLocationDot } from "react-icons/fa6";
import { GrOrganization } from "react-icons/gr";
import { FaPhoneSquare } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { IoIosTime } from "react-icons/io";
import { FaLandmark } from "react-icons/fa";
import { FaBowlFood } from "react-icons/fa6";
import { GiveCard } from "./PersonalCard";
import axios from "axios";
import CompleteRequest from "./CompleteRequest";

const ongoingRequests = [
  {
    givername: "Ayesha Imam",
    foodtype: "Biryani",
    foodServing: "4",
    takername: "Fatima Sattar",
    contact: "1234567890",
  },
];

const OngoingRequestCard = () => {
  return (
    <div className="w-full flex">
      {ongoingRequests && ongoingRequests.length > 0 ? (
        ongoingRequests.map((data, index) => (
          <div className="flex flex-col w-full bg-green/10 border border-black/25 rounded-sm p-2 lg:w-3/5 md:w-3/4">
              <GiveCard
                label="Giver Name"
                icon={<IoPerson />}
                data={data.givername}
              />
              <GiveCard
                label="Food Type"
                icon={<FaBowlFood />}
                data={data.foodtype}
              />
              <GiveCard
                label="Servings"
                icon={<FaPeopleGroup />}
                data={data.foodServing}
              />
              <GiveCard
                label="Taker Name"
                icon={<IoPerson />}
                data={data.takername}
              />
              <GiveCard
                label="Contact"
                icon={<FaPhoneSquare />}
                data={data.contact}
              />
              <div className="flex w-full flex-col lg:gap-3 ml-2">
                <h1 className="font-notosans font-semibold text-lg lg:text-xl">
                  Location:
                </h1>
                <a
                  href="/"
                  className="font-notosans text-lg lg:text-xl text-blue-700 underline"
                >
                  View Location on Map
                </a>
              </div>

            <div className="flex justify-center mt-6 items-center">
              <CompleteRequest requestId={data.id} />
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

export default OngoingRequestCard;

