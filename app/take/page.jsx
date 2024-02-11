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
            <div className=' bg-white text-black flex-row m-5 p-5'>
                <div>Enter location here</div>
                <div>Choose on map</div>
            </div>
        </div>
      <div className='flex-row bg-green w-[30%] justify-center gap-1'>
            <Card/>
            <Card/>
            <Card/>
        </div>  
    </main>
    
  )
}

export default Take

