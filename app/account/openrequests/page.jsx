"use client";
import { useRequests } from "@/app/hooks/RequestsContext";
import React from "react";
import RequestCard from "../components/RequestCard";

const OpenRequests = () => {
  const { requests } = useRequests();

  return (
    <div className="flex flex-col md:flex-row w-full h-full p-4 gap-4">
      {/* Column for Give Requests */}
      <div className="flex flex-col md:flex-1 p-4 text-deepBlue md:border-r-2 border-deepBlue md:overflow-y-scroll no-scrollbar">
        <h2 className="text-3xl font-bold mb-4">Give Requests</h2>
        {requests?.openGiveRequest?.length > 0 ? (
          requests.openGiveRequest.map((request, index) => (
            // <div
            //   key={index}
            //   className="border border-deepBlue/35 p-4 mb-4 md:mb-6 rounded-lg bg-skyblue/50 shadow-xl"
            // >
            //   <div className="pb-2 border-b border-deepBlue/35">
            //     <h3 className="text-xl font-semibold">{request.foodType}</h3>
            //     <div className="flex flex-col gap-1 md:flex-row my-2 justify-between">
            //       <p>
            //         Serve <strong>{request.foodServing}</strong> people
            //       </p>
            //       <p className="text-left lg:text-start">
            //         Available until{" "}
            //         <strong>{formatTime(request.availability)}</strong>
            //       </p>
            //     </div>
            //   </div>

            //   <div
            //     className="w-full cursor-pointer py-2"
            //     onClick={() => toggleDropdown(setUserInfoOpen, index)}
            //   >
            //     <div className="flex items-center">
            //       <strong className="text-lg">Giver Information</strong>
            //       <IoIosArrowDown
            //         className={`text-2xl font-bold pt-1 ml-auto transition-transform duration-300 ${
            //           userInfoOpen[index] ? "rotate-180" : "rotate-0"
            //         }`}
            //       />
            //     </div>
            //     <ul
            //       className={`text-sm lg:text-base grid grid-cols-1 gap-3 lg:grid-cols-2 w-full justify-between transition-all duration-300 overflow-hidden ${
            //         userInfoOpen[index]
            //           ? "my-1 max-h-auto opacity-100"
            //           : "my-0 max-h-0 opacity-0"
            //       }`}
            //     >
            //       <li className="flex justify-between gap:2 lg:flex-col pl-2 border-l border-deepBlue/35">
            //         <strong>Name</strong>{" "}
            //         <p className="text-right lg:text-start">{request.name}</p>
            //       </li>
            //       <li className="flex justify-between gap:2 lg:flex-col pl-2 border-l border-deepBlue/35">
            //         <strong>Giving Organization</strong>
            //         <p className="text-right lg:text-start">
            //           {request.givingOrg}
            //         </p>
            //       </li>
            //       <li className="flex justify-between gap:2 lg:flex-col pl-2 border-l border-deepBlue/35">
            //         <strong>Contact</strong>
            //         <p className="text-right lg:text-start">
            //           0{request.contact}
            //         </p>
            //       </li>
            //       <li className="flex justify-between gap:2 lg:flex-col pl-2 border-l border-deepBlue/35">
            //         <strong>Comments</strong>{" "}
            //         <p className="text-right lg:text-start">
            //           {request.comments}
            //         </p>
            //       </li>
            //     </ul>
            //   </div>

            //   <div
            //     className="w-full cursor-pointer py-2"
            //     onClick={() => toggleDropdown(setLocationInfoOpen, index)}
            //   >
            //     <div className="flex items-center">
            //       <strong className="text-lg">Location Information</strong>
            //       <IoIosArrowDown
            //         className={`text-2xl font-bold pt-1 ml-auto transition-transform duration-300 ${
            //           locationInfoOpen[index] ? "rotate-180" : "rotate-0"
            //         }`}
            //       />
            //     </div>
            //     <ul
            //       className={`text-sm lg:text-base grid grid-cols-1 gap-3 lg:grid-cols-2 w-full justify-between transition-all duration-300 overflow-hidden ${
            //         locationInfoOpen[index]
            //           ? "my-1 max-h-auto opacity-100"
            //           : "my-0 max-h-0 opacity-0"
            //       }`}
            //     >
            //       <li className="flex justify-between gap:2 lg:flex-col pl-2 border-l border-deepBlue/35">
            //         <strong>Location</strong>{" "}
            //         <p className="text-right lg:text-start flex lg:flex-col">
            //           {/* {displayLocation(request.location)} */}
            //           <a
            //             className="text-violet"
            //             href={`https://www.google.com/maps?q=${request.location.latitude},${request.location.longitude}`}
            //             target="_blank"
            //             rel="noopener noreferrer"
            //           >
            //             View on Google Maps
            //           </a>
            //         </p>
            //       </li>
            //       <li className="flex justify-between gap:2 lg:flex-col pl-2 border-l border-deepBlue/35">
            //         <strong>Landmark</strong>
            //         <p className="text-right lg:text-start">
            //           {request.landmark}
            //         </p>
            //       </li>
            //     </ul>
            //   </div>

            //   {request.takersRequesting?.length > 0 ? (
            //     <div
            //       className="w-full cursor-pointer py-2"
            //       onClick={() => toggleDropdown(setTakerInfoOpen, index)}
            //     >
            //       <div className="flex items-center">
            //         <strong className="text-lg">Takers Information</strong>
            //         <IoIosArrowDown
            //           className={`text-2xl font-bold pt-1 ml-auto transition-transform duration-300 ${
            //             takerInfoOpen[index] ? "rotate-180" : "rotate-0"
            //           }`}
            //         />
            //       </div>
            //       {request.takersRequesting.map((taker, idx) => (
            //         <div
            //           className={` border-t border-deepBlue/35 ${
            //             takerInfoOpen[index]
            //               ? "mt-4 max-h-auto opacity-100"
            //               : "mt-0 max-h-0 opacity-0"
            //           }`}
            //         >
            //           <ul
            //             key={idx}
            //             className={`text-sm lg:text-base grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 w-full justify-between transition-all duration-300 overflow-hidden ${
            //               takerInfoOpen[index] ? "my-3" : "my-0"
            //             }`}
            //           >
            //             <li className="flex justify-between gap:2 lg:flex-col pl-2 border-l border-deepBlue/35">
            //               <strong>Name</strong>{" "}
            //               <p className="sm:text-right lg:text-start">
            //                 {taker.name}
            //               </p>
            //             </li>
            //             <li className="flex justify-between gap:2 lg:flex-col pl-2 border-l border-deepBlue/35">
            //               <strong>Contact</strong>
            //               <p className="sm:text-right lg:text-start">
            //                 {taker.contact}
            //               </p>
            //             </li>
            //             <li className="flex justify-between gap:2 lg:flex-col pl-2 border-l border-deepBlue/35">
            //               <strong>Location</strong>
            //               <p className="sm:text-right lg:text-start">
            //                 {/* {displayLocation(taker.location)} */}
            //                 <a
            //                   className="text-violet"
            //                   href={`https://www.google.com/maps?q=${taker.location.latitude},${taker.location.longitude}`}
            //                   target="_blank"
            //                   rel="noopener noreferrer"
            //                 >
            //                   View on Google Maps
            //                 </a>
            //               </p>
            //             </li>
            //           </ul>
            //           <div className="flex justify-between">
            //             <button className="btn-primary h-10 w-24 lg:w-28 text-sm lg:text-base px-3 py-0 me-0 mb-0">
            //               Accept
            //             </button>
            //             <button className="btn-primary h-10 w-24 lg:w-28 text-sm lg:text-base px-3 py-0 me-0 mb-0 bg-red hover:bg-rose-950">
            //               Reject
            //             </button>
            //           </div>
            //         </div>
            //       ))}
            //     </div>
            //   ) : (
            //     <p className="text-violet">No one requested to deliver.</p>
            //   )}
            // </div>

            <RequestCard
              key={index}
              index={index}
              requestType="openGiveRequest"
              request={request}
            />
          ))
        ) : (
          <div className="w-full mt-4 md:mt-0 md:h-4/5 flex justify-center items-center">
            <p>You did not open any give requests yet.</p>
          </div>
        )}
      </div>

      {/* Column for Take Requests */}

      <div className="flex flex-col md:flex-1 p-4 text-deepBlue md:overflow-y-scroll no-scrollbar">
        <h2 className="text-3xl font-bold mb-4">Take Requests</h2>
        {requests?.openTakeRequest?.length > 0 ? (
          requests.openTakeRequest.map((request, index) => (
            // <div
            //   key={index}
            //   className="border border-deepBlue/35 p-4 mb-4 md:mb-6 rounded-lg bg-skyblue/50 shadow-xl"
            // >
            //   <div className="pb-2 border-b border-deepBlue/35">
            //     <h3 className="text-xl font-semibold">{request.foodType}</h3>
            //     <div className="flex flex-col gap-1 md:flex-row my-2 justify-between">
            //       <p>
            //         Serve <strong>{request.foodServing}</strong> people
            //       </p>
            //       <p className="text-left lg:text-start">
            //         Available until{" "}
            //         <strong>{formatTime(request.availability)}</strong>
            //       </p>
            //     </div>
            //   </div>

            //   <div
            //     className="w-full cursor-pointer py-2"
            //     onClick={() => toggleDropdown(setUserInfoOpen, index)}
            //   >
            //     <div className="flex items-center">
            //       <strong className="text-lg">Giver Information</strong>
            //       <IoIosArrowDown
            //         className={`text-2xl font-bold pt-1 ml-auto transition-transform duration-300 ${
            //           userInfoOpen[index] ? "rotate-180" : "rotate-0"
            //         }`}
            //       />
            //     </div>
            //     <ul
            //       className={`text-sm lg:text-base grid grid-cols-1 gap-3 lg:grid-cols-2 w-full justify-between transition-all duration-300 overflow-hidden ${
            //         userInfoOpen[index]
            //           ? "my-1 max-h-auto opacity-100"
            //           : "my-0 max-h-0 opacity-0"
            //       }`}
            //     >
            //       <li className="flex justify-between gap:2 lg:flex-col pl-2 border-l border-deepBlue/35">
            //         <strong>Name</strong>{" "}
            //         <p className="text-right lg:text-start">{request.name}</p>
            //       </li>
            //       <li className="flex justify-between gap:2 lg:flex-col pl-2 border-l border-deepBlue/35">
            //         <strong>Giving Organization</strong>
            //         <p className="text-right lg:text-start">
            //           {request.givingOrg}
            //         </p>
            //       </li>
            //       <li className="flex justify-between gap:2 lg:flex-col pl-2 border-l border-deepBlue/35">
            //         <strong>Contact</strong>
            //         <p className="text-right lg:text-start">
            //           0{request.contact}
            //         </p>
            //       </li>
            //       <li className="flex justify-between gap:2 lg:flex-col pl-2 border-l border-deepBlue/35">
            //         <strong>Comments</strong>{" "}
            //         <p className="text-right lg:text-start">
            //           {request.comments}
            //         </p>
            //       </li>
            //     </ul>
            //   </div>

            //   <div
            //     className="w-full cursor-pointer py-2"
            //     onClick={() => toggleDropdown(setLocationInfoOpen, index)}
            //   >
            //     <div className="flex items-center">
            //       <strong className="text-lg">Location Information</strong>
            //       <IoIosArrowDown
            //         className={`text-2xl font-bold pt-1 ml-auto transition-transform duration-300 ${
            //           locationInfoOpen[index] ? "rotate-180" : "rotate-0"
            //         }`}
            //       />
            //     </div>
            //     <ul
            //       className={`text-sm lg:text-base grid grid-cols-1 gap-3 lg:grid-cols-2 w-full justify-between transition-all duration-300 overflow-hidden ${
            //         locationInfoOpen[index]
            //           ? "my-1 max-h-auto opacity-100"
            //           : "my-0 max-h-0 opacity-0"
            //       }`}
            //     >
            //       <li className="flex justify-between gap:2 lg:flex-col pl-2 border-l border-deepBlue/35">
            //         <strong>Location</strong>{" "}
            //         <p className="text-right lg:text-start flex lg:flex-col">
            //           {/* {displayLocation(request.location)} */}
            //           <a
            //             className="text-violet"
            //             href={`https://www.google.com/maps?q=${request.location.latitude},${request.location.longitude}`}
            //             target="_blank"
            //             rel="noopener noreferrer"
            //           >
            //             View on Google Maps
            //           </a>
            //         </p>
            //       </li>
            //       <li className="flex justify-between gap:2 lg:flex-col pl-2 border-l border-deepBlue/35">
            //         <strong>Landmark</strong>
            //         <p className="text-right lg:text-start">
            //           {request.landmark}
            //         </p>
            //       </li>
            //     </ul>
            //   </div>
            //   <p className="text-violet">Once the giver accepts your request, it will move to the ongoing requests section.</p>
            // </div>
            <RequestCard
              key={index}
              index={index}
              requestType="openTakeRequest"
              request={request}
            />
          ))
        ) : (
          <div className="w-full mt-4 md:mt-0 md:h-4/5 flex justify-center items-center">
            <p>You did not open any take requests yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OpenRequests;

