"use client";
import React, { useState, useEffect } from "react";
import { IoPerson } from "react-icons/io5";
import { GrOrganization } from "react-icons/gr";
import { FaPhoneSquare } from "react-icons/fa";
import { FaBowlFood } from "react-icons/fa6";
import { FaPeopleGroup } from "react-icons/fa6";
import { IoIosTime } from "react-icons/io";
import { FaLandmark } from "react-icons/fa";
import { IoInformationCircle } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import axios from "axios";
import RequestCard from "../account/components/RequestCard";

const GiveCard = ({label, icon, data}) => {
    return (
      <div className="flex flex-col mb-5 lg:mb-8  mx-3 py-1 lg:w-1/2 border-b-[3px] border-black">
        <div className="flex justify-between items-center">
          <h1 className="font-notosans text-lg font-bold text-black/80">
            {label}
          </h1>
          {icon && <div className="text-lg">{React.cloneElement(icon)}</div>}
        </div>
        <p className="font-notosans text-lg">{data}</p>
      </div>
    );
}
export default function GiveInfoCard({title, data}) {
  // Getting the Give Request ID, for which the user is sending a delivery request
  const giveRequestData = data.giveRequest;
  // const giveRequestId = data;
  // console.log(data);
  // console.log("Give Request Data", giveRequestData);


  // const [giveRequestData, setGiveRequestData] = useState([]);

  // useEffect(() => {
  //   const getData = async (giveRequestId) => {
  //     try {
  //       const response = await axios.get(
  //         `http://localhost:3000/api/giveRequest/${giveRequestId}`
  //       );
  //       if (response.data.result) {
  //         console.log("API Response:", response.data);
  //         const apiData = response.data.result;
  //         setGiveRequestData(apiData);
  //       } else {
  //         setGiveRequestData([]);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   getData(giveRequestId);
  // }, [giveRequestId]);


  const formatTime = (time) => {
    const date = new Date(time);
    return date.toLocaleString(); // Returns date and time in a human-readable format
  };

  return (
    <div className="w-full md:w-4/5 lg:w-full p-6 xl:px-12">
      <p className="font-notosans text-xl md:text-2xl lg:text-3xl font-semibold lg:font-bold mb-4">
        {title}
      </p>

      {/* <div className="flex flex-col justify-center mt-4 lg:mt-0 bg-green/10 border border-black/25">
        <div className="w-full mt-3 lg:mt-5 lg:flex lg:items-center lg:gap-16">
          <GiveCard
            label="Name"
            icon={<IoPerson />}
            data={giveRequestData.name}
          />
          <GiveCard
            label="Giving Organization"
            icon={<GrOrganization />}
            data={giveRequestData.givingOrg}
          />
        </div>

        <div className="w-full lg:flex lg:items-end lg:gap-16">
          <GiveCard
            label="Contact"
            icon={<FaPhoneSquare />}
            data={giveRequestData.contact}
          />
          <GiveCard
            label="Food Type"
            icon={<FaBowlFood />}
            data={giveRequestData.foodType}
          />
        </div>

        <div className="w-full lg:flex lg:items-center lg:gap-16">
          <GiveCard
            label="Food Serving"
            icon={<FaPeopleGroup />}
            data={giveRequestData.foodServing}
          />
          <GiveCard
            label="Availability"
            icon={<IoIosTime />}
            data={giveRequestData.availability}
          />
        </div>

        <div className="w-full lg:flex lg:items-end lg:gap-16">
          <GiveCard
            label="Landmark"
            icon={<FaLandmark />}
            data={giveRequestData.landmark}
          />
          <GiveCard
            label="Additional Informtion"
            icon={<IoInformationCircle />}
            data={giveRequestData.comments}
          />
        </div>
        // {/* <div className="lg:pr-28">
        //   <GiveCard
        //     label="Location"
        //     icon={<FaLocationDot />}
        //     // data={giveRequestData.location}
        //     data={`${giveRequestData.location.latitude}, ${giveRequestData.location.longitude}`}
        //   />
        // </div> 
        <div className="lg:pr-28">
          <div className="flex flex-col mb-5 lg:mb-8  mx-3 py-1 lg:w-1/2 border-b-[3px] border-black">
            <div className="flex justify-between items-center">
              <h1 className="font-notosans text-lg font-bold text-black/80">
                Location
              </h1>
              <FaLocationDot className="text-lg" />
            </div>
            <p className="font-notosans text-lg flex flex-col">
              <span>Latitude:&nbsp; {giveRequestData.location.latitude}</span>
              <span>Longitude:&nbsp; {giveRequestData.location.longitude}</span>
            </p>
          </div>
        </div>
      </div> */}

      <div className="border border-deepBlue/35 p-4 rounded-lg bg-skyblue/50 shadow-xl">
        <div className="pb-2 border-b border-deepBlue/35">
          <h3 className="text-2xl font-bold">{giveRequestData.foodType}</h3>
          <div className="flex flex-col gap-1 md:flex-row my-2 justify-between text-base md:text-lg">
            <p>
              Serve <strong>{giveRequestData.foodServing}</strong> people
            </p>
            <p className="text-left lg:text-start">
              Available until{" "}
              <strong>{formatTime(giveRequestData.availability)}</strong>
            </p>
          </div>
        </div>
        <div className="w-full cursor-pointer pb-4 pt-3 border-b border-deepBlue/35">
          <div className="flex items-center">
            <strong className="text-xl">Giver Information</strong>
          </div>
          <ul
            className={`text-base md:text-lg grid grid-cols-1 gap-3 lg:grid-cols-2 w-full justify-between transition-all duration-300 overflow-hidden mt-3 md:mt-4 max-h-auto opacity-100
            `}
          >
            <li className="flex justify-between gap:2 lg:flex-col pl-2 border-l border-deepBlue/35">
              <strong>Name</strong>{" "}
              <p className="text-right lg:text-start">{giveRequestData.name}</p>
            </li>
            <li className="flex justify-between gap:2 lg:flex-col pl-2 border-l border-deepBlue/35">
              <strong>Giving Organization</strong>
              <p className="text-right lg:text-start">
                {giveRequestData.givingOrg}
              </p>
            </li>
            <li className="flex justify-between gap:2 lg:flex-col pl-2 border-l border-deepBlue/35">
              <strong>Contact</strong>
              <p className="text-right lg:text-start">
                0{giveRequestData.contact}
              </p>
            </li>
            <li className="flex justify-between gap:2 lg:flex-col pl-2 border-l border-deepBlue/35">
              <strong>Comments</strong>{" "}
              <p className="text-right lg:text-start">
                {giveRequestData.comments}
              </p>
            </li>
          </ul>
        </div>
        <div className="w-full cursor-pointer pt-3">
          <div className="flex items-center">
            <strong className="text-xl">Location Information</strong>
          </div>
          <ul
            className={`text-base md:text-lg grid grid-cols-1 gap-3 lg:grid-cols-2 w-full justify-between transition-all duration-300 overflow-hidden mt-3 md:mt-4 max-h-auto opacity-100 
              `}
          >
            <li className="flex justify-between gap:2 lg:flex-col pl-2 border-l border-deepBlue/35">
              <strong>Location</strong>{" "}
              <p className="text-right lg:text-start flex lg:flex-col">
                <a
                  className="text-violet"
                  href={`https://www.google.com/maps?q=${giveRequestData.location.latitude},${giveRequestData.location.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on Google Maps
                </a>
              </p>
            </li>
            <li className="flex justify-between gap:2 lg:flex-col pl-2 border-l border-deepBlue/35">
              <strong>Landmark</strong>
              <p className="text-right lg:text-start">
                {giveRequestData.landmark}
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
