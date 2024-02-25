"use client"
import React,{useState,useEffect} from 'react'
import Toast from "../components/Toast";
import Side from '../components/Side';
import Header from '../components/Header';
import HistoryCard from '../components/HistoryCard';
import PersonalCard from '../components/PersonalCard';
import GiveRequestsTable from '../components/GiveRequestsTable';
import TakenRequestsTable from '../components/TakenRequestsTable';
import OngoingRequestCard from '../components/OngoingRequestCard';
import Notifications from '../components/Notifications';
import Logout from '../components/Logout';
import { useUser } from "../hooks/UserContext";
import axios from "axios";

const Account = () => {
  // Getting the authenticated userID
  const { user } = useUser();
  const userId = user.userId;

  const [notifications, setNotifications] = useState([]);
  const [ongoingRequests, setOngoingRequests] = useState([]);

  useEffect(() => {
    const getData = async (userId) => {
      try {
        const response = await axios({
          url: "http://localhost:3000/api/profile",
          method: "POST",
          data: { userId },
        });
        if (response.data.result) {
          console.log("API Response:", response.data);
          setNotifications(response.data.takersRequesting);
          setOngoingRequests(response.data.ongoingRequests);
        } else {
          setNotifications([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData(userId);
  }, [userId]);
  return (
    <div className="min-h-screen flex flex-col w-full justify-start">
      <Toast />
      <h4 className="logo-primary w-full text-center py-5 fixed bg-white">
        SHARED PLATE
      </h4>
      <div className="fixed">
        <Side />
      </div>

      <div className="w-full scroll-smooth">
        <div className="mt-20 w-11/12 mx-4 mb-9 flex flex-col gap-4 lg:w-4/5 lg:ml-80 lg:gap-6">
          <Header title={"Personal Information"} subtitle={"Get to know me!"} />
          <PersonalCard />
        </div>
        <Notifications notifications={notifications} />
        <div className="mt-20 w-11/12 mx-4 mb-9 flex flex-col gap-4 lg:w-4/5 lg:ml-80 lg:gap-6">
          <Header
            title={"Ongoing Requests"}
            subtitle={"Following are you current requests in process"}
          />
          <OngoingRequestCard ongoingRequests={ongoingRequests} />
        </div>
        {/*<Header title={"History"} subtitle={""} />
        <HistoryCard title={""} />
        <Header title={"Taken Requests"} subtitle={""} />
        <TakenRequestsTable />
        <Header title={"Given Requests"} subtitle={""} />
        <GiveRequestsTable />*/}
        <div className="mt-20 w-11/12 mx-4 mb-9 flex flex-col gap-4 lg:w-4/5 lg:ml-80 lg:gap-6">
          <Header title={"Logout"} subtitle={""} />
          <Logout />
        </div>
      </div>
    </div>
  );
}

export default Account
