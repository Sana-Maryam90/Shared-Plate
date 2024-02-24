import React from 'react'
import Link from 'next/link';
import Image from 'next/image'


//this is our card component
const Card = (props) => {
  return (
    <div className=" bg-green/10 border border-black/25 text-black w-4/5 flex-row m-6 p-4 md:mx-12 justify-center items-center md:w-[90%]">
      <div className="break-words font-black text-xl">{props.name}</div>
      <div className="break-words font-bold text-lg">{props.organization}</div>
      <div className="break-words text-base font-semibold text-zinc-600">
        {props.type}
      </div>
      <div className="break-words font-semibold text-base">
        Servings: {props.serving}
      </div>
      <div className="flex justify-center items-center mt-2 lg:mt-4">
        <Link href={`/take/${props.id}`}>
          <button className="btn-primary">Request</button>
        </Link>
        {/* <Link href={"/reject"}>
          <button className="btn-primary hover:bg-red">Reject</button>
        </Link> */}
      </div>
    </div>
  );
}

export default Card
