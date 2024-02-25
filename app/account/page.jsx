"use client"
import React,{useState,useEffect} from 'react'
import Side from '../components/Side';
import Header from '../components/Header';
import HistoryCard from '../components/HistoryCard';
import PersonalCard from '../components/PersonalCard';
import GiveRequestsTable from '../components/GiveRequestsTable';
import TakenRequestsTable from '../components/TakenRequestsTable';
import OngoingRequestCard from '../components/OngoingRequestCard';
import Logout from '../components/Logout';

const Account = () => {
  return (
    <div className='flex justify-start'>
      <div className='fixed'><Side/></div>
      
      <div className='flex flex-col justify-between items-center scroll-smooth'>
        <Header title={"Personal Information"} subtitle={"Get to know me!"}/>
        <PersonalCard title={""}/>
        <Header title={"Ongoing Requests"} subtitle={""}/>
        <OngoingRequestCard/>
        <Header title={"History"} subtitle={""}/>
        <HistoryCard title={""}/>
        <Header title={"Taken Requests"} subtitle={""}/>
        <TakenRequestsTable/>
        <Header title={"Given Requests"} subtitle={""}/>
        <GiveRequestsTable/>
        <Header title={"Logout"} subtitle={""}/>
        <Logout/>
      </div>
    </div>
  )
}

export default Account
