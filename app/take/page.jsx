'use client';
import GoogleMap from '../components/GoogleMap';
import React from 'react'
import Card from '../components/Card';
import { FaCircleDot } from "react-icons/fa6";
import { FaMapMarkerAlt } from "react-icons/fa";



const Take = () => {
  return (

    <main className="font-notoSans 2xl:flex xl:flex lg:flex md:flex">
        {/*big screens*/}
      <div className='w-[100%] md:w-[60%] 2xl:w-[70%] xl:w-[70%] lg:w-[70%]'>
        <GoogleMap/>
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
        <Card/>
        <Card/>
        <Card/>
      </div>  
    </main>
    
  )
}

export default Take

