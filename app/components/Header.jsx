import React from 'react'

const Header = ({title,subtitle}) => {
  return (
    <div>
      <div className='font-notosans text-3xl md:text-5xl font-bold text-center'>{title}</div>
      <div className='font-notosans text-1xl md:text-2xl font-bold text-center'>{subtitle}</div>
    </div>
  )
}

export default Header
