"use client"
import React from 'react'
import Side from '../components/Side';
import Header from '../components/Header';

const Account = () => {
    
  return (
    <div className='flex '>
      <div className='w-max'><Side /></div>
      
      <main className='w-[100%]'>
        <Header title={"Personal Information"} subtitle={"Get to know me!"}/>
      </main>
      
      

    </div>
  )
}

export default Account
