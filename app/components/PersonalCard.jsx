import React,{useState,useEffect} from 'react'
import { FaHourglassHalf } from "react-icons/fa"
import { MdEmail } from "react-icons/md"

import { useUser } from "../hooks/UserContext"
import axios from 'axios'

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

const PersonalCard = () => {
  // Getting the authenticated userID
  const { user } = useUser();
  const userId = user.userId;
  const [personalData, setPersonalData] = useState([]);

  useEffect(()=>{
    
    //console.log('Fetching data for user:', userId);
    const fetchData = async()=>{
      try{
        const response = await axios({
          url: `http://localhost:3000/api/user/${userId}`,
          method: "GET",
        });
        //const response = await axios.get(`http://localhost:3000/api/user/${userId}`);
        console.log('Response data:', response.data);
        setPersonalData(response.data);
      }catch(error){
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
    
  },[userId])


  return (
    
    <div className='w-[95%] md:w-[80%] lg:w-[40%]'>
      <div className="w-[100%] md:w-[100%] lg:w-[100%] my-5 md:my-10 ">
        <div className="w-[100%] flex flex-row justify-center mt-4 lg:mt-0 bg-green/10 border border-black/25">
          <div className="w-[100%] mt-3 flex flex-col lg:mt-5 lg:flex lg:items-center lg:gap-1">
          {personalData && (
            <>
              <GiveCard
                label="Full Name"
                icon={<FaHourglassHalf/>}
                data={personalData.name}
              />
              <GiveCard
                label="Email Information"
                icon={<MdEmail/>}
                data={personalData.email}
              />
            </>
          )}
          </div>
        </div>
      </div>
    </div>
  )
}

  
export default PersonalCard


