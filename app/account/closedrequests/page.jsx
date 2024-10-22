"use client";
import { useRequests } from "@/app/hooks/RequestsContext";
import React from "react";
import RequestCard from "../components/RequestCard";
import Loader from "../components/Loader";

const ClosedRequests = () => {
  const { requests, loading } = useRequests();
  if (loading) {
    return (
      <Loader />
    );
  }

  return (
    <div className="flex flex-col md:flex-row w-full h-full p-4 gap-4">
      {/* Column for Give Requests */}
      <div className="flex flex-col md:flex-1 p-4 text-deepBlue md:border-r-2 border-deepBlue md:overflow-y-scroll no-scrollbar">
        <h2 className="text-3xl font-bold mb-4">Give Requests</h2>
        {requests?.closedGiveRequests?.length > 0 ? (
          requests.closedGiveRequests.map((request, index) => (
            <RequestCard
              key={index}
              index={index}
              requestType="closedGiveRequest"
              request={request}
            />
          ))
        ) : (
          <div className="w-full mt-4 md:mt-0 md:h-4/5 flex justify-center items-center">
            <p>You do not have any closed give requests yet.</p>
          </div>
        )}
      </div>

      {/* Column for Take Requests */}

      <div className="flex flex-col md:flex-1 p-4 text-deepBlue md:overflow-y-scroll no-scrollbar">
        <h2 className="text-3xl font-bold mb-4">Take Requests</h2>
        {requests?.closedTakeRequests?.length > 0 ? (
          requests.closedTakeRequests.map((request, index) => (
            <RequestCard
              key={index}
              index={index}
              requestType="closedTakeRequest"
              request={request}
            />
          ))
        ) : (
          <div className="w-full mt-4 md:mt-0 md:h-4/5 flex justify-center items-center">
            <p>You do not have any closed take requests yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClosedRequests;
