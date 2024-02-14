import React from 'react'
import Link from 'next/link';

const Card = () => {
  return (
    <div className=' bg-white text-black w-[90%] flex-row m-5 p-5'>
        <div>Name</div>
        <div>Organization/Restaurant/Home-Based</div>
        <div>Address</div>
        <div>Type of Food</div>
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
