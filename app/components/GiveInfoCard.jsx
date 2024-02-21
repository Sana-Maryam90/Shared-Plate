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

// const giveRequestData = {
//   name: "Fatima Zehra",
//   givingOrg: "Alkhidmat Welfare Foundation",
//   contact: "12345678901",
//   foodType: "Packaged Food",
//   foodServing: "4",
//   availability: "06:00:00",
//   landmark: "Aziz National School, Gulberg",
//   comments: "Food is Vegetarian ",
//   location: "ABC Street, Block 00, Gulshan-e-Iqbal, Karachi",
// };

const GiveCard = ({label, icon, data}) => {
    return (
      //   <div className="flex flex-col bg-green/10 border border-black/25 rounded-sm mb-5 lg:mb-8  px-3 py-1 lg:w-1/2">
      //     <div className="flex justify-between items-center">
      //       <h1 className="font-notosans text-lg font-bold text-black/80">
      //         {label}
      //       </h1>
      //       {icon && (
      //         <div className="text-lg">
      //           {React.cloneElement(icon)}
      //         </div>
      //       )}
      //     </div>
      //     <p className="font-notosans text-lg">{data}</p>
      //   </div>
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
  // const giveRequestId = '';
  // const giveRequestData = data.giveRequest;
  const giveRequestId = data;
  console.log(data);
  console.log("giveRequestId", giveRequestId);


  const [giveRequestData, setGiveRequestData] = useState([]);

  useEffect(() => {
    const getData = async (giveRequestId) => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/giveRequest/${giveRequestId}`
        );
        if (response.data.result) {
          console.log("API Response:", response.data);
          const apiData = response.data.result;
          setGiveRequestData(apiData);
        } else {
          setGiveRequestData([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData(giveRequestId);
  }, [giveRequestId]);

  return (
    <div className="w-3/4 md:w-1/2 lg:w-10/12 my-5 md:my-10 ">
      <p className="font-notosans text-xl md:text-2xl lg:text-3xl font-semibold lg:font-bold mb-2 lg:mb-4">
        {title}
      </p>

      <div className="flex flex-col justify-center mt-4 lg:mt-0 bg-green/10 border border-black/25">
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
        <div className="lg:pr-28">
          <GiveCard
            label="Location"
            icon={<FaLocationDot />}
            // data={giveRequestData.location}
            // data={`Latitude: ${giveRequestData.location.latitude}, Longitude: ${giveRequestData.location.longitude}`}

          />
        </div>
      </div>
    </div>
  );
}
