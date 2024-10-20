"use client"
import React,{useState,useEffect} from 'react'
import { FaHourglassHalf } from "react-icons/fa"
import { FaHandshakeAngle } from "react-icons/fa6"
import { FaMotorcycle } from "react-icons/fa6"
import { useUser } from "../hooks/UserContext"
import axios from 'axios'

const giveRequestData = {
    "giverCount":1,
    "takerCount":1,
    "ongoingRequests":0
  };

const GiveCard = ({label, icon, data}) => {
    return (
      <div className="flex flex-col mb-5 lg:mb-8  mx-3 py-1 lg:w-1/2 ">
        <div className="flex justify-between items-center">
          {icon && <div className="text-lg ">{React.cloneElement(icon)}</div>}
          <h1 className="font-notosans text-lg font-bold text-black/80 mb-1">
            {label}
          </h1>
        </div>
        <p className="font-notosans text-lg text-center">{data? data: "0"}</p>
      </div>
    );
}

const HistoryCard = ({title}) => {
  // Getting the authenticated userID
  const { user } = useUser();
  const userId = user.userId;
  const [historicalData, setHistoricalData] = useState([]);

  useEffect(()=>{
    const fetchData = async (userId) => {
      try {
        const response = await axios.post(
          `http://localhost:3000/api/profile/${userId}`
        );
        console.log(response.data);
        setHistoricalData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData(userId);
  },[userId])

  return (
    <div className="w-[95%] md:w-[80%] lg:w-[40%]">
      <div className="w-[100%] md:w-[100%] lg:w-[100%] ">
        <p className="font-notosans text-xl md:text-2xl lg:text-3xl font-semibold lg:font-bold mb-2 lg:mb-4">
          {title}
        </p>

        <div className="w-[100%] flex flex-row justify-center mt-4 lg:mt-0 bg-green/10 border border-black/25">
          <div className="w-[100%] mt-3 flex flex-col lg:flex lg:items-center lg:gap-1">
            {historicalData && (
              <>
                <GiveCard
                  label="No of ongoing requests"
                  icon={<FaHourglassHalf />}
                  data={historicalData.ongoingRequests}
                />
                <GiveCard
                  label="No of times food given"
                  icon={<FaHandshakeAngle />}
                  data={historicalData.giverRequests}
                />
                <GiveCard
                  label="No of times food taken"
                  icon={<FaMotorcycle />}
                  data={historicalData.takerRequests}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

  
export default HistoryCard


