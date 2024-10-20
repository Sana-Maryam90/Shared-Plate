import { toast } from "react-toastify";
import React, { useState, useEffect } from "react";
import { useUser } from "../hooks/UserContext";
import axios from "axios";


export default function Notifications() {
  const { user } = useUser();
  const userId = user.userId;

  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    const getData = async (userId) => {
    const data = {userId}
      try {
        const response = await axios({
          url: "http://localhost:3000/api/profile",
          method: "POST",
          data: data,
        });
        if (response.data.result) {
          console.log("API Response:", response.data);
          setNotifications(response.data.takersRequesting);
        } else {
          setNotifications([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData(userId);
  }, [userId]);

  const handleClick = async (requestId) => {
    const closeRequestdata = {
      userId,
      requestId
    };
    // console.log("closeRequestdata", closeRequestdata);
    // try {
    //   const response = await axios({
    //     url: "http://localhost:3000/api/acceptRequest",
    //     method: "POST",
    //     data: closeRequestdata,
    //   });
    //   console.log("API Response:", response.data);
    //   toast.success("Request Accepted")
    // } catch (error) {
    //     console.error("Error fetching data:", error);
    // }
  };
  console.log(notifications);
  const notifi = [
    {
      contact: 12345658609,
      name: "Fatima Zehra",
      comments:
        "Getting the authenticated userID Getting the authenticated userID",
      location: { longitude: 23, latitude: 45 },
    },
    {
      contact: 1,
      name: "Item 1",
      comments: 10,
      location: { longitude: 23, latitude: 45 },
    },
    {
      contact: 1,
      name: "Item 1",
      comments: 10,
      location: { longitude: 23, latitude: 45 },
    },
    {
      contact: 1,
      name: "Item 1",
      comments: 10,
      location: { longitude: 23, latitude: 45 },
    },
  ];

  return (
    <div className="w-11/12 mx-4 mb-9 flex flex-col gap-4 lg:w-4/5 lg:ml-80 lg:gap-6">
      <h1 className="text-center font-notosans text-3xl md:text-5xl font-bold lg:text-start">
        Request Notifications
      </h1>
      <div className="w-full flex flex-wrap">
        {notifications && notifications.length > 0 ? (
          notifications.map((data, index) => (
            <div
              key={index}
              className="flex flex-col w-full bg-green/10 border border-black/25 rounded-sm mb-5 lg:mb-8 p-2 lg:w-1/3 lg:mr-14 md:w-3/5"
            >
              <h1 className="w-full font-notosans text-lg font-bold text-black/80 lg:text-2xl">
                Take Request # {index + 1}
              </h1>
              <div className="flex w-full flex-col items-center gap-2 my-3">
                <div className="flex w-full gap-4 lg:gap-6">
                  <h1 className="font-notosans font-semibold text-lg lg:text-xl">
                    Name:
                  </h1>
                  <p className="font-notosans text-lg lg:text-xl">
                    {data.name}
                  </p>
                </div>
                <div className="flex w-full gap-4 lg:gap-6">
                  <h1 className="font-notosans font-semibold text-lg lg:text-xl">
                    Contact:
                  </h1>
                  <p className="font-notosans text-lg lg:text-xl">
                    {data.contact}
                  </p>
                </div>
                <div className="flex w-full gap-4 lg:gap-6">
                  <h1 className="font-notosans font-semibold text-lg lg:text-xl">
                    Comments:
                  </h1>
                  <p className="font-notosans text-lg lg:text-xl">
                    {data.comments}
                  </p>
                </div>
                <div className="flex w-full gap-4 lg:gap-6">
                  <h1 className="font-notosans font-semibold text-lg lg:text-xl">
                    Location:
                  </h1>
                  <a
                    href={`https://www.google.com/maps?q=${data.location.latitude},${data.location.longitude}`}
                    className="font-notosans text-lg lg:text-xl text-blue-700 underline"
                  >
                    View Location on Map
                  </a>
                </div>
                <div className="flex mt-3 w-full justify-evenly">
                  <button
                    className="block btn-primary"
                    onClick={handleClick(data.requestId)}
                  >
                    Accept
                  </button>
                  <button className="block btn-primary">Reject</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h1 className="font-notosans font-semibold text-lg lg:text-xl">
            You do not have any recent notifications
          </h1>
        )}
      </div>
    </div>
  );
}
