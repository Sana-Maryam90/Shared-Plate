"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { getCurrentUser } from "../components/GetUser";

const RequestsContext = createContext();

export const RequestsProvider = ({ children }) => {
  const [requests, setRequests] = useState({
    closedGiveRequests: [],
    closedTakeRequests: [],
    ongoingGiveRequests: [],
    ongoingTakeRequests: [],
    openGiveRequests: [],
    openTakeRequests: [],
  });

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({ userId: null }); // Initialize user with an object

  const getAllRequests = async (userId) => {
    setLoading(true);
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
    } finally {
      setLoading(false); // Set loading to false after data is fetched
    }
  };

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

  useEffect(() => {
    const userId = user.userId;
    if (user || user.userId) {
      // Check if userId is valid before making the API call
      getAllRequests(userId);
    }
  }, [user]);

  return (
    <RequestsContext.Provider value={{ requests, user, loading, getAllRequests }}>
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
