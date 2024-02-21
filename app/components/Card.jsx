import React from 'react'
import Link from 'next/link';
import Image from 'next/image'


//this is our card component
const Card = (props) => {
  return (
    <div className=' bg-white text-black w-[80%] flex-row m-5 p-3 justify-center items-center md:w-[90%] 2xl:w-[90%] xl:w-[90%] lg:w-[90%]'>
      <div className='break-words font-black text-xl'>{props.name}</div>
      <div className='break-words font-bold text-lg'>{props.organization}</div>
      <div className='break-words text-base font-semibold text-zinc-600'>{props.type}</div>
      <div className='break-words font-semibold text-base'>Servings: {props.serving}</div>
      <div className="flex flex-col 2xl:flex-row xl:flex-row lg:flex-row md:flex-row justify-center items-center mt-2 gap-1 2xl:gap-8 mx-4 xl:mt-4 xl:ml-9 xl:gap-16">
        <Link href={`/take/${props.id}`}>
          <button className="btn-primary">Request</button>
        </Link>
        {/* <Link href={"/reject"}>
          <button className="btn-primary hover:bg-red">Reject</button>
        </Link> */}
      </div>
    </div>
  )
}

export default Card
