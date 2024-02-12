'use client';
import GoogleMap from '../components/GoogleMap';
import React from 'react'
import Card from '../components/Card';

const Take = () => {
  return (

    <main className="flex min-h-screen font-notoSans">
        {/*big screens*/}
        <div className='w-[70%]'>
            <GoogleMap/>
            <div className=' bg-white text-black flex-row m-5 p-2'>
                <div>
                  <input 
                    placeholder='Enter location here'
                    className='bg-transparent w-full pt-2 pb-3 pl-2 text-xl border-none focus:outline-none font-semibold'
                  />
                  </div>
                <div className='w-full pt-2 pb-3 pl-2 text-xl text-sky-500 font-semibold'>Choose on map</div>
            </div>
        </div>
      <div className='flex-row bg-green w-[30%] justify-center gap-1 items-center'>
            <Card/>
            <Card/>
            <Card/>
        </div>  
    </main>
    
  )
}

export default Take

