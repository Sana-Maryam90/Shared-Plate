"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { getCurrentUser } from "../components/GetUser";

const RequestsContext = createContext();

export const RequestsProvider = ({ children }) => {
  const [requests, setRequests] = useState({
    closedGiveRequest: [],
    closedTakeRequest: [],
    ongoingGiveRequest: [],
    ongoingTakeRequest: [],
    openGiveRequest: [],
    openTakeRequest: [],
  });

  const [user, setUser] = useState({ userId: null }); // Initialize user with an object

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userDetails = await getCurrentUser();
        setUser(userDetails);
      } catch (error) {
        console.error("Error fetching user:", error); // Log any errors encountered
      }
    };

    fetchUser();
  }, []);

  const userId = user.userId;
  useEffect(() => {
    if (user || user.userId) {
      // Check if userId is valid before making the API call
      const getAllRequests = async () => {
        try {
          const response = await axios({
            url: "http://localhost:3000/api/profile",
            method: "POST",
            data: { userId },
          });
          if (response.status === 200) {
            setRequests(response.data);
          }
        } catch (error) {
          console.error("Error fetching requests data:", error);
        }
      };

      getAllRequests();
    }
  }, [user]);

  return (
    <RequestsContext.Provider value={{ requests, user }}>
      {children}
    </RequestsContext.Provider>
  );
};

export const useRequests = () => {
  const context = useContext(RequestsContext);
  if (!context) {
    throw new Error("useRequests must be used within a Requests Provider");
  }
  return context;
};
