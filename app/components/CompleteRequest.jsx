import React from 'react'
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';
import axios from 'axios';

const CompleteRequest = ({ requestId }) => {
  const router = useRouter();
  const handleCompleteRequest = async (e) => {
    e.preventDefault();
    try {
      const response = await axios({
        url: "http://localhost:3000/api/closeRequest",
        method: "POST",
        data: { requestId },
      });
      console.log("Complete Request Response:", response.data);
      toast.success("Request completed!");

      //navigate to home page
      setTimeout(() => {
        router.push("/");
      }, 1000);
    } catch (error) {
      console.error("Request failed with status code", error.response.status);
      toast.error("Unable to complete the request");
    }
  };
  return (
    <div>
      <button className="btn-primary mb-3" onClick={handleCompleteRequest}>
        Completed
      </button>
    </div>
  );
};

export default CompleteRequest
