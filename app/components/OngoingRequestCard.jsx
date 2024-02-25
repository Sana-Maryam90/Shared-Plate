"use client"
import React,{useState,useEffect} from 'react'
import { IoPerson } from "react-icons/io5";
import { useUser } from "../hooks/UserContext";
import { FaLocationDot } from "react-icons/fa6";
import { GrOrganization } from "react-icons/gr";
import { FaPhoneSquare } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import Link from 'next/link';
import axios from 'axios'
import CompleteRequest from './CompleteRequest';

/*
const giveRequestData = {
  name: "Fatima Zehra",
  givingOrg: "Alkhidmat Welfare Foundation",
  contact: "12345678901",
};
*/

const GiveCard = ({label, icon, data}) => {
    return (
        <div className="flex flex-col mb-5 lg:mb-8  mx-3 py-1 lg:w-1/2 ">
        <div className="flex justify-center items-center gap-6">
          {icon && <div className="text-lg m-1">{React.cloneElement(icon)}</div>}
          <h1 className="font-notosans text-lg font-bold text-black/80 mb-1">
            {label}
          </h1>
        </div>
        <p className="font-notosans text-lg text-center">{data}</p>
      </div>
    );
}

const OngoingRequestCard = () => {
  // Getting the authenticated userID
 const { user } = useUser();
 const userId = user.userId;
 const [personalData, setPersonalData] = useState([]);

 useEffect(()=>{
   
   console.log('Fetching data for user:', userId);
   const fetchData = async (userId) => {
     try {
       const response = await axios.get(`http://localhost:3000/api/user/${userId}`);
       //const response = await axios.get(`http://localhost:3000/api/user/${userId}`);
       console.log("Response data:", response.data);
       const apiData = response.data;
       setPersonalData(apiData.userInfo);
     } catch (error) {
       console.error("Error fetching data:", error);
     }
   };
   fetchData(userId);
   
 },[userId])


 return (
   
   <div className='w-[95%] md:w-[80%] lg:w-[40%]'>
     <div className="w-[100%] md:w-[100%]  my-5 md:my-10 ">
       <div className="w-max flex flex-col justify-center mt-4 lg:mt-0 bg-green/10 border border-black/25">
         <div className="w-[100%] mt-3 flex  lg:mt-5 lg:flex lg:items-center lg:gap-1">
         {personalData && (
           <>
             <GiveCard
               label="Giver Name"
               icon={<IoPerson/>}
               data={personalData.name}
             />
             <GiveCard
               label="Servings"
               icon={<FaPeopleGroup />}
               data={personalData.name}
             />

             <GiveCard
               label="Giving Organization"
               icon={<GrOrganization/>}
               data={personalData.name}
             />
           </>
         )}
         </div>
         <div className="w-[100%] mt-3 flex  lg:mt-5 lg:flex lg:items-center lg:gap-1">
         {personalData && (
         <>
           <GiveCard
              label="Taker Name"
              icon={<IoPerson/>}
              data={personalData.email}
            />

            <GiveCard
              label="Contact Number"
              icon={<FaPhoneSquare />}
              data={personalData.email}
            />

            <GiveCard
              label="Location"
              icon={<FaLocationDot />}
              data={personalData.email}
            />
         </>
         )}
        </div>
        <div className='flex justify-center items-center'>
        <CompleteRequest/>
        </div>
       </div>
     </div>
   </div>
  )
}

export default OngoingRequestCard
