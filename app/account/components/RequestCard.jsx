"use client";
import { IoIosArrowDown } from "react-icons/io";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRequests } from "@/app/hooks/RequestsContext";

// Reusable Request Card Component
const RequestCard = ({
  request,
  requestType,
  index
}) => {
  // console.log(request)
  const { user, getAllRequests } = useRequests();

  const [userInfoOpen, setUserInfoOpen] = useState({}); // Object to store toggle state per request
  const [locationInfoOpen, setLocationInfoOpen] = useState({});
  const [takerInfoOpen, setTakerInfoOpen] = useState({});

  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState("No reason provided");

  const toggleDropdown = (setter, index) => {
    setter((prevState) => ({
      ...prevState,
      [index]: !prevState[index], // Toggle the specific request
    }));
  };

  // Reject the take request of a person in an open give request
  // Handle reject button click
  const handleReject = () => {
    setShowRejectModal(true);
  };

  // Send rejection reason via API
  const sendRejection = async (taker) => {
    try {
    const rejectData = {
      userId: taker.userId,
      requestId: request._id,
      reason: rejectReason,
    };
    const response = await axios({
      url: "http://localhost:3000/api/rejectRequest",
      method: "POST",
      data: rejectData,
    });
      if (response.status === 200) {
        toast.success("Taker rejected successfully!");
        setShowRejectModal(false);
        // Again fetch updated requests
        if (user && user.userId) {
          getAllRequests(user.userId)
        } else {
          console.error("User ID is not available.");
        }
      } else {
        toast.error(response.data.message || "An error occurred.");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("An unexpected error occurred."); // Fallback error message
    }
    }
  };

  // Handle accept request
  const handleAccept = async (taker) => {
    try {
      const acceptData = {
        userId: taker.userId,
        requestId: request._id,
      };
      const response = await axios({
        url: "http://localhost:3000/api/acceptRequest",
        method: "POST",
        data: acceptData,
      });

      if (response.status === 200) {
        toast.success("Taker accepted successfully!");
        // Again fetch updated requests
        if (user && user.userId) {
          getAllRequests(user.userId);
        } else {
          console.error("User ID is not available.");
        }
      } else {
        toast.error(response.data.message || "An error occurred.");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("An unexpected error occurred."); // Fallback error message
    }
    }
  };

  // Handle Close/Complete request 
  const handleCloseRequest = async () => {
    try {
      const closeRequestData = {
        requestId: request._id,
      };
      const response = await axios({
        url: "http://localhost:3000/api/closeRequest",
        method: "POST",
        data: closeRequestData,
      });

      if (response.status === 200) {
        toast.success("Request completed successfully!");
        // Again fetch updated requests
        if (user && user.userId) {
          getAllRequests(user.userId);
        } else {
          console.error("User ID is not available.");
        }
      } else {
        toast.error(response.data.message || "An error occurred.");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred."); // Fallback error message
      }
    }
  }
  
  // Helper function to format the availability time
  const formatTime = (time) => {
    const date = new Date(time);
    return date.toLocaleString(); // Returns date and time in a human-readable format
  };
  return (
    <div
      key={index}
      className="border border-deepBlue/35 p-4 mb-4 md:mb-6 rounded-lg bg-skyblue/50 shadow-xl"
    >
      {/* Request Basic Information */}
      <div className="pb-2 border-b border-deepBlue/35">
        <h3 className="text-xl font-semibold">{request.foodType}</h3>
        <div className="flex flex-col gap-1 md:flex-row my-2 justify-between">
          <p>
            Serve <strong>{request.foodServing}</strong> people
          </p>
          <p className="text-left lg:text-start">
            Available until <strong>{formatTime(request.availability)}</strong>
          </p>
        </div>
      </div>

      {/* Giver Information */}
      <div className="w-full py-2">
        <div
          className="flex cursor-pointer items-center"
          onClick={() => toggleDropdown(setUserInfoOpen, index)}
        >
          <strong className="text-lg">Giver Information</strong>
          <IoIosArrowDown
            className={`text-2xl font-bold pt-1 ml-auto transition-transform duration-300 ${
              userInfoOpen[index] ? "rotate-180" : "rotate-0"
            }`}
          />
        </div>
        <ul
          className={`text-sm lg:text-base grid grid-cols-1 gap-3 lg:grid-cols-2 w-full justify-between transition-all duration-300 overflow-hidden ${
            userInfoOpen[index]
              ? "my-1 max-h-auto opacity-100"
              : "my-0 max-h-0 opacity-0"
          }`}
        >
          <li className="flex justify-between gap:2 lg:flex-col pl-2 border-l border-deepBlue/35">
            <strong>Name</strong>
            <p className="text-right lg:text-start">{request.name}</p>
          </li>
          <li className="flex justify-between gap:2 lg:flex-col pl-2 border-l border-deepBlue/35">
            <strong>Giving Organization</strong>
            <p className="text-right lg:text-start">{request.givingOrg}</p>
          </li>
          <li className="flex justify-between gap:2 lg:flex-col pl-2 border-l border-deepBlue/35">
            <strong>Contact</strong>
            <p className="text-right lg:text-start">0{request.contact}</p>
          </li>
          <li className="flex justify-between gap:2 lg:flex-col pl-2 border-l border-deepBlue/35">
            <strong>Comments</strong>
            <p className="text-right lg:text-start">{request.comments}</p>
          </li>
        </ul>
      </div>

      {/* Giver Location Information */}
      <div className="w-full py-2">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => toggleDropdown(setLocationInfoOpen, index)}
        >
          <strong className="text-lg">Giver Location Information</strong>
          <IoIosArrowDown
            className={`text-2xl font-bold pt-1 ml-auto transition-transform duration-300 ${
              locationInfoOpen[index] ? "rotate-180" : "rotate-0"
            }`}
          />
        </div>
        <ul
          className={`text-sm lg:text-base grid grid-cols-1 gap-3 lg:grid-cols-2 w-full justify-between transition-all duration-300 overflow-hidden ${
            locationInfoOpen[index]
              ? "my-1 max-h-auto opacity-100"
              : "my-0 max-h-0 opacity-0"
          }`}
        >
          <li className="flex justify-between gap:2 lg:flex-col pl-2 border-l border-deepBlue/35">
            <strong>Location</strong>
            <p className="text-right lg:text-start flex lg:flex-col">
              <a
                className="text-violet"
                href={`https://www.google.com/maps?q=${request.location.latitude},${request.location.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View on Google Maps
              </a>
            </p>
          </li>
          <li className="flex justify-between gap:2 lg:flex-col pl-2 border-l border-deepBlue/35">
            <strong>Landmark</strong>
            <p className="text-right lg:text-start">{request.landmark}</p>
          </li>
        </ul>
      </div>

      {/* Takers Information for give requests*/}
      {requestType === "openGiveRequest" &&
        request.takersRequesting?.length > 0 && (
          <div className="w-full py-2">
            <div
              className="flex items-center cursor-pointer "
              onClick={() => toggleDropdown(setTakerInfoOpen, index)}
            >
              <strong className="text-lg">Requested Takers Information</strong>
              <IoIosArrowDown
                className={`text-2xl font-bold pt-1 ml-auto transition-transform duration-300 ${
                  takerInfoOpen[index] ? "rotate-180" : "rotate-0"
                }`}
              />
            </div>
            {request.takersRequesting.map((taker, idx) => (
              <div
                key={idx}
                className={`border-t border-deepBlue/35 ${
                  takerInfoOpen[index]
                    ? "mt-4 max-h-auto opacity-100"
                    : "mt-0 max-h-0 opacity-0"
                }`}
              >
                <ul
                  className={`text-sm lg:text-base grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 w-full justify-between transition-all duration-300 overflow-hidden ${
                    takerInfoOpen[index] ? "my-3" : "my-0"
                  }`}
                >
                  <li className="flex justify-between gap:2 lg:flex-col pl-2 border-l border-deepBlue/35">
                    <strong>Name</strong>
                    <p className="sm:text-right lg:text-start">{taker.name}</p>
                  </li>
                  <li className="flex justify-between gap:2 lg:flex-col pl-2 border-l border-deepBlue/35">
                    <strong>Contact</strong>
                    <p className="sm:text-right lg:text-start">
                      {taker.contact}
                    </p>
                  </li>
                  <li className="flex justify-between gap:2 lg:flex-col pl-2 border-l border-deepBlue/35">
                    <strong>Location</strong>
                    <p className="sm:text-right lg:text-start">
                      <a
                        className="text-violet"
                        href={`https://www.google.com/maps?q=${taker.location.latitude},${taker.location.longitude}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View on Google Maps
                      </a>
                    </p>
                  </li>
                </ul>
                <div className="flex justify-between">
                  <button
                    onClick={() => handleAccept(taker)}
                    className="btn-primary h-10 w-24 lg:w-28 text-sm lg:text-base px-3 py-0 me-0 mb-0"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleReject()}
                    className="btn-primary h-10 w-24 lg:w-28 text-sm lg:text-base px-3 py-0 me-0 mb-0 bg-red hover:bg-rose-950"
                  >
                    Reject
                  </button>
                </div>

                {showRejectModal && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-bgwhite p-6 rounded-lg shadow-lg w-4/5 md:w-1/2 lg:w-1/3">
                      <h2 className="text-lg font-semibold mb-4">
                        Reason for Rejection
                      </h2>
                      <textarea
                        className="w-full p-2 border border-deepBlue/35 rounded mb-4"
                        rows="4"
                        value={rejectReason}
                        onChange={(e) => setRejectReason(e.target.value)}
                        placeholder="Enter the reason for rejection"
                      />
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => {
                            sendRejection(taker);
                          }}
                          className="btn-primary h-10 w-24 lg:w-28 text-sm lg:text-base px-3 py-0 me-0 mb-0"
                        >
                          Send
                        </button>
                        <button
                          onClick={() => setShowRejectModal(false)}
                          className="btn-primary h-10 w-24 lg:w-28 text-sm lg:text-base px-3 py-0 me-0 mb-0 bg-red hover:bg-rose-950"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

      {requestType === "openGiveRequest" &&
        request.takersRequesting?.length === 0 && (
          <p className="text-violet">No one requested to deliver.</p>
        )}

      {requestType === "openTakeRequest" && (
        <p className="text-violet">
          Once the giver accepts your request, it will move to the ongoing
          requests section.
        </p>
      )}

      {/* Conditionally render an extra div if request status is ongoing */}
      {request.volunteerInfo && (
        <div className="w-full py-2">
          <div
            className="flex items-center cursor-pointer "
            onClick={() => toggleDropdown(setTakerInfoOpen, 0)}
          >
            <strong className="text-lg">Takers Information</strong>
            <IoIosArrowDown
              className={`text-2xl font-bold pt-1 ml-auto transition-transform duration-300 ${
                takerInfoOpen[0] ? "rotate-180" : "rotate-0"
              }`}
            />
          </div>
          <div
            className={`border-t border-deepBlue/35 ${
              takerInfoOpen[0]
                ? "mt-4 max-h-auto opacity-100"
                : "mt-0 max-h-0 opacity-0"
            }`}
          >
            <ul
              className={`text-sm lg:text-base grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 w-full justify-between transition-all duration-300 overflow-hidden ${
                takerInfoOpen[0] ? "my-3" : "my-0"
              }`}
            >
              <li className="flex justify-between gap:2 lg:flex-col pl-2 border-l border-deepBlue/35">
                <strong>Name</strong>
                <p className="sm:text-right lg:text-start">
                  {request.volunteerInfo[0].name}
                </p>
              </li>
              <li className="flex justify-between gap:2 lg:flex-col pl-2 border-l border-deepBlue/35">
                <strong>Contact</strong>
                <p className="sm:text-right lg:text-start">
                  {request.volunteerInfo[0].contact}
                </p>
              </li>
              <li className="flex justify-between gap:2 lg:flex-col pl-2 border-l border-deepBlue/35">
                <strong>Location</strong>
                <p className="sm:text-right lg:text-start">
                  <a
                    className="text-violet"
                    href={`https://www.google.com/maps?q=${request.volunteerInfo[0].location.latitude},${request.volunteerInfo[0].location.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View on Google Maps
                  </a>
                </p>
              </li>
            </ul>
          </div>
          {request.status === "ongoing" &&
            requestType === "ongoingGiveRequest" && (
              <div className="relative w-full text-end z-30 mt-2">
                <button
                  onClick={handleCloseRequest}
                  className="btn-primary h-10 text-sm lg:text-[1rem] px-3 py-0 me-0 mb-0"
                >
                  Completed
                </button>
              </div>
            )}
        </div>
      )}

      {request.status === "ongoing" && requestType === "ongoingTakeRequest" && (
        <p className="text-violet">
          Once the giver completes the request, the request will be shifted to
          closed requests section
        </p>
      )}
    </div>
  );
};

export default RequestCard;
