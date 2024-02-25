import React from 'react'

const Header = ({title,subtitle}) => {
  return (
    <div>
      <h1 className="text-center font-notosans text-3xl md:text-5xl font-bold lg:text-start">
        {title}
      </h1>
      <div className="mt-3 lg:mt-5  text-center font-notosans text-1xl md:text-2xl font-bold lg:text-start">
        {subtitle}
      </div>
    </div>
  );
}

export default Header
