"use client"
import React from 'react'
import Side from '../components/Side';
import Header from '../components/Header';
import HistoryCard from '../components/HistoryCard';
import PersonalCard from '../components/PersonalCard';
import GiveRequestsTable from '../components/GiveRequestsTable';
import TakenRequestsTable from '../components/TakenRequestsTable';


const Account = () => {
    
  return (
    <div className='flex justify-start'>
      <div className='w-max fixed'><Side /></div>
      
      <div className='w-[90%] flex flex-col justify-between items-center scroll-smooth'>
        <Header title={"Personal Information"} subtitle={"Get to know me!"}/>
        <PersonalCard title={""}/>
        <Header title={"Ongoing Requests"} subtitle={""}/>
        <Header title={"History"} subtitle={""}/>
        <HistoryCard title={""}/>
        <Header title={"Current Taken Requests"} subtitle={""}/>
        <Header title={"Previous Taken Requests"} subtitle={""}/>
        <TakenRequestsTable/>
        <Header title={"Current Given Requests"} subtitle={""}/>
        <Header title={"Previous Given Requests"} subtitle={""}/>
        <GiveRequestsTable/>
      </div>
    </div>
  )
}

export default Account
