import React,{useState,useEffect} from 'react'
import { IoPerson } from "react-icons/io5";
import { MdEmail } from "react-icons/md"
import { useUser } from "../hooks/UserContext";
import axios from 'axios'

export const GiveCard = ({label, icon, data}) => {
    return (
      <div className="flex flex-col mx-3 py-2 lg:w-1/2 ">
        <div className="flex justify-start items-center gap-16 mb-2">
          <h1 className="font-notosans text-lg font-bold text-black/80">
            {label}
          </h1>
          {icon && (
            <div className="text-lg">{React.cloneElement(icon)}</div>
          )}
        </div>
        <p className="font-notosans text-lg text-left">{data}</p>
      </div>
    );
}

const PersonalCard = () => {
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

      <div className="flex flex-col w-full bg-green/10 border border-black/25 rounded-sm p-2 lg:w-3/5 md:w-3/4">
        {personalData && (
          <div className="flex w-full gap-8">
            <GiveCard
              label="Full Name"
              icon={<IoPerson />}
              data={personalData.name}
            />
            <GiveCard
              label="Email Information"
              icon={<MdEmail />}
              data={personalData.email}
            />
          </div>
        )}
      {/* <div className="w-[100%] md:w-[100%] lg:w-[100%] mt-2 mb-5 lg:mt-6 lg:mb-8">
        <div className=" justify-start flex w-full bg-green/10 border border-black/25 rounded-sm mb-5 lg:mb-8 p-2 lg:w-1/3 lg:mr-14 md:w-3/5">
          <div className="w-[100%] mt-3 flex flex-col lg:mt-5 lg:flex lg:items-center lg:gap-1">
            {personalData && (
              <div className="flex">
                <GiveCard
                  label="Full Name"
                  icon={<IoPerson />}
                  data={personalData.name}
                />
                <GiveCard
                  label="Email Information"
                  icon={<MdEmail />}
                  data={personalData.email}
                />
              </div>
            )}
          </div>
        </div>
      </div> */}
    </div>
  );
}

  
export default PersonalCard


