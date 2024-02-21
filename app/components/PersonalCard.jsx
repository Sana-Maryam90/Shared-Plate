import React from 'react'
import { FaHourglassHalf } from "react-icons/fa"
import { FaHandshakeAngle } from "react-icons/fa6"
import { FaMotorcycle } from "react-icons/fa6"

const giveRequestData = {
  name: "Fatima Zehra",
  givingOrg: "Alkhidmat Welfare Foundation",
  contact: "12345678901",
  };


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

const PersonalCard = ({title}) => {
  return (
    <div className='w-[95%] md:w-[80%] lg:w-[40%]'>
      <div className="w-[100%] md:w-[100%] lg:w-[100%] my-5 md:my-10 ">
        <p className="font-notosans text-xl md:text-2xl lg:text-3xl font-semibold lg:font-bold mb-2 lg:mb-4">
          {title}
        </p>
  
        <div className="w-[100%] flex flex-row justify-center mt-4 lg:mt-0 bg-green/10 border border-black/25">
          <div className="w-[100%] mt-3 flex flex-col lg:mt-5 lg:flex lg:items-center lg:gap-1">
            <GiveCard
              label="Full Name"
              icon={<FaHourglassHalf/>}
              data={giveRequestData.name}
            />
            <GiveCard
              label="Contact Information"
              icon={<FaHandshakeAngle/>}
              data={giveRequestData.contact}
            />
            <GiveCard
              label="Associated Organization"
              icon={<FaMotorcycle />}
              data={giveRequestData.givingOrg}
            />

          </div>
        </div>
      </div>
    </div>
  )
}

  
export default PersonalCard


