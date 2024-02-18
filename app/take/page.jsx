'use client';
import GoogleMap from '../components/GoogleMap';
import React from 'react'
import Card from '../components/Card';
import { FaCircleDot } from "react-icons/fa6";
import { FaMapMarkerAlt } from "react-icons/fa";



const Take = () => {
    // sampleData.js
const requests = [
    {
      name: "John Doe",
      organization: "Community Kitchen",
      foodtype: "Pasta",
      location: { latitude: 24.91958236034102, longitude: 67.09738983659071 }
    },
    {
      name: "Alice Smith",
      organization: "Local Church",
      foodtype: "Burgers",
      location: { latitude: 24.951316863001107, longitude: 67.16312097762261 }
    },
    {
      name: "Michael Johnson",
      organization: "Food Bank",
      foodtype: "Vegetarian",
      location: { latitude: 25.04199986759563, longitude: 67.1528014153569 }
    },
    // Add more data here
  ];
    



  return (

    <main className="font-notoSans 2xl:flex xl:flex lg:flex md:flex">
        {/*big screens*/}
      <div className='w-[100%] md:w-[60%] 2xl:w-[70%] xl:w-[70%] lg:w-[70%]'>
        <GoogleMap requests={requests}/>
        <div className=' bg-white text-black flex-row m-5 p-2'>
          <div className='flex justify-center items-center'>
            <FaCircleDot className='text-xl font-semibold' color='#9CA3AF' />
            <input 
              placeholder='Enter location here'
              className='bg-transparent w-full pt-2 pb-3 pl-2 text-xl  border-b-4 border-e-gray-950 focus:outline-none font-semibold'
            />
          </div>
          <div className='flex justify-center items-center'>
            <FaMapMarkerAlt className='text-sky-500 font-semibold text-xl'/>
            <div className='w-full pt-2 pb-3 pl-2 text-xl text-sky-500 font-semibold'>Choose on map</div>
          </div>
        </div>
      </div>

      <div className='flex flex-col bg-green justify-center  items-center w-[100%] md:w-[40%] 2xl:w-[30%] xl:w-[30%] lg:w-[30%]'>
      {requests.map((request, index) => (
          <Card
            key={index}
            name={request.name}
            organization={request.organization}
            type={request.foodtype}
          />
        ))}
        
      </div>  
    </main>
    
  )
}

export default Take;

