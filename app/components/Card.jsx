import React from 'react'
import Link from 'next/link';
import Image from 'next/image'

const Card = () => {
  return (
    <div className=' bg-white text-black w-[90%] flex-row m-5 p-3 justify-center items-center'>
        <div className='text-xl font-black'>Name</div>
        <div className='text-lg font-bold'>Organization/Restaurant/Home-Based</div>
        <div className='text-base font-semibold'>Address</div>
        <div className='text-base font-semibold text-zinc-600'>Type of Food</div>
        <div className="flex flex-row justify-center mt-2 gap-8 mx-4 xl:mt-4 xl:ml-9 xl:gap-16">
            <Link href={"/accept"}>
                <button className="btn-primary">Accept</button>
            </Link>
            <Link href={"/reject"}>
                <button className="btn-primary">Reject</button>
            </Link>
        </div>
    </div>
  )
}

export default Card
